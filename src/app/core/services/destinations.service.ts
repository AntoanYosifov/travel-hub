import {Injectable} from "@angular/core";
import {
    addDoc,
    collection,
    collectionData,
    deleteDoc,
    CollectionReference,
    doc,
    docData,
    DocumentReference,
    query,
    where,
    documentId,
    Firestore, setDoc
} from "@angular/fire/firestore";
import {from, map, Observable} from "rxjs";
import {Destination} from "../../models/destination.model";

@Injectable({
    providedIn: 'root'
})
export class DestinationsService {
    private destinationsCollectionPath = 'destinations';

    constructor(private firestore: Firestore) {}

    getDestinations(): Observable<Destination[]> {
        const collectionReference =
            collection(this.firestore, this.destinationsCollectionPath) as CollectionReference<Destination>;

        return  collectionData<Destination>(collectionReference,{idField: 'id'});
    }

    getDestinationById(id: string): Observable<Destination | undefined> {
        let docRef = doc(this.firestore, `${this.destinationsCollectionPath}/${id}`) as DocumentReference<Destination>;
        return docData<Destination>(docRef, {idField: 'id'})
    }

    addDestination(data: Omit<Destination, "id">): Observable<Destination> {
        const col = collection(this.firestore, this.destinationsCollectionPath) as CollectionReference<Destination>;
        return  from(addDoc(col, data)).pipe(
            map(ref => ({
                id: ref.id,
                ...data
            }))
        );
    }

    hasLiked$(destId: string, uid: string): Observable<boolean> {
        const likesCol = collection(this.firestore, `${this.destinationsCollectionPath}/${destId}/likes`);
        const q = query(likesCol, where(documentId(), '==', uid));
        return collectionData(q).pipe(map(arr => arr.length > 0));
    }

    likesCount$(destId: string): Observable<number> {
        const likesCol = collection(this.firestore, `${this.destinationsCollectionPath}/${destId}/likes`);
        return collectionData(likesCol).pipe(map(arr => arr.length));
    }

    like$(destId: string, uid: string): Observable<void> {
        const likeRef = doc(this.firestore, `${this.destinationsCollectionPath}/${destId}/likes/${uid}`);
        return from(setDoc(likeRef, { uid,liked: true}));
    }

    unlike$(destId: string, uid: string): Observable<void> {
        const likeRef = doc(this.firestore, `${this.destinationsCollectionPath}/${destId}/likes/${uid}`);
        return from(deleteDoc(likeRef));
    }
}