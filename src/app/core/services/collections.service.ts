import {Injectable} from "@angular/core";
import {
    collection,
    collectionData,
    CollectionReference, deleteDoc,
    doc,
    docSnapshots,
    DocumentReference,
    Firestore, setDoc
} from "@angular/fire/firestore";
import {from, map, Observable} from "rxjs";
import {Destination} from "../../models/destination.model";

@Injectable({providedIn: 'root'})
export class CollectionsService {
    private userCollectionsPath = 'users';

    constructor(private firestore: Firestore) {
    }

    getWantToVisit$(uid: string): Observable<Destination[]> {
        const col =
            collection(this.firestore, `${this.userCollectionsPath}/${uid}/wantToVisit`) as CollectionReference<Destination>;
        return collectionData<Destination>(col, {idField: 'id'});
    }

    hasWantToVisit$(uid: string, destId: string): Observable<boolean> {
        const ref = doc(this.firestore, `${this.userCollectionsPath}/${uid}/wantToVisit/${destId}`);
        return docSnapshots(ref).pipe(map(s => s.exists()));
    }

    addWantToVisit$(uid: string, dest: Destination): Observable<void> {
        const ref =
            doc(this.firestore, `${this.userCollectionsPath}/${uid}/wantToVisit/${dest.id}`) as DocumentReference<Destination>;

        return from(setDoc(ref, dest));
    }

    removeWantToVisit$(uid: string, destId: string): Observable<void> {
        const ref = doc(this.firestore, `${this.userCollectionsPath}/${uid}/wantToVisit/${destId}`);
        return from(deleteDoc(ref));
    }
}