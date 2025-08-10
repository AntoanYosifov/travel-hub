import {computed, Injectable, signal} from "@angular/core";
import {
    Auth,
    createUserWithEmailAndPassword, onAuthStateChanged,
    signInWithEmailAndPassword, signOut,
    User as FirebaseUser
} from "@angular/fire/auth";
import {doc, docData, DocumentReference, Firestore, setDoc} from "@angular/fire/firestore";
import {UserModel, UserProfileDefaults} from "../../models/user.model";
import {from, map, Observable, of, switchMap} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {

    private _userSignal = signal<FirebaseUser | null>(null);
    readonly userSignal = this._userSignal.asReadonly();

    private _profileSignal = signal<UserModel | null>(null);
    readonly profileSignal = this._profileSignal.asReadonly();

    readonly isLoggedIn = computed(() => !!this._userSignal());

    private _authResolved = signal(false);
    readonly authResolved = this._authResolved.asReadonly();

    constructor(private auth: Auth, private firestore: Firestore) {
        const authState$ =
            new Observable<FirebaseUser | null>((subscriber) => {
                const unsubscribe = onAuthStateChanged(
                    this.auth,
                    (user) => subscriber.next(user),
                    (err) => subscriber.error(err)
                );
                return () => unsubscribe();
            });

        let first = true;

        authState$
            .pipe(
                switchMap((user) => {
                    this._userSignal.set(user);

                    if (!user) {
                        this._profileSignal.set(null);
                        return of(null);
                    }

                    const ref = doc(
                        this.firestore,
                        `users/${user.uid}`
                    ) as DocumentReference<UserModel>;
                    return docData<UserModel>(ref, {idField: "uid"}) as Observable<UserModel | null>
                })
            )
            .subscribe({
                    next: (profile: UserModel | null) => {
                        this._profileSignal.set(profile ?? null);
                        if (first) {
                            this._authResolved.set(true);
                            first = false;
                        }
                    },
                    error: (err) => {
                        console.error("Auth pipe line error", err);
                        if (first) {
                            this._authResolved.set(true);
                            first = false;
                        }
                    }
                }
            )
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
        return from(signInWithEmailAndPassword(this.auth, email, password).then((cred) => cred.user));
    }

    logout$(): Observable<void> {
        return from(signOut(this.auth));
    }
}