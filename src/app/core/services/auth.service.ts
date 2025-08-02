import {Injectable, signal} from "@angular/core";
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut,
    User as FirebaseUser
} from "@angular/fire/auth";
import {doc, docData, DocumentReference, Firestore, setDoc} from "@angular/fire/firestore";
import {UserModel, UserProfileDefaults} from "../../models/user.model";
import {from, map, Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {

    private _userSignal = signal<FirebaseUser | null>(null);
    readonly userSignal = this._userSignal.asReadonly();

    private _profileSignal = signal<UserModel | null>(null);
    readonly profileSignal = this._profileSignal.asReadonly();

    constructor(private auth: Auth, private firestore: Firestore) {
        this.auth.onAuthStateChanged(user => {
            this._userSignal.set(user);

            if (!user) {
                this._profileSignal.set(null);
                return;
            }

            const ref = doc(this.firestore, `users/${user.uid}`) as DocumentReference<UserModel>;
            docData<UserModel>(ref, {idField: 'uid'})
                .subscribe(profile => this._profileSignal.set(profile ?? null))

        })
    }

    register$(displayName: string, email: string, password: string): Observable<void> {
        return from(
            createUserWithEmailAndPassword(this.auth, email, password)
                .then(cred => {
                    const uid = cred.user.uid;

                    const profile: UserModel = {
                        uid,
                        displayName,
                        email,
                        ...UserProfileDefaults
                    };

                    const ref = doc(this.firestore, `users/${uid}`) as DocumentReference<UserModel>;
                    return setDoc(ref, profile);
                })
        );
    }

    login$(email: string, password: string): Observable<FirebaseUser> {
        return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
            map(cred => cred.user)
        );
    }

    logout$(): Observable<void> {
        return from(signOut(this.auth));
    }
}