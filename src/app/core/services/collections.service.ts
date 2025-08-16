import {Injectable} from "@angular/core";
import {
    collection,
    collectionData,
    CollectionReference, deleteDoc,
    doc,
    docSnapshots,
    DocumentReference,
    Firestore, query, setDoc, where,
    collectionGroup,
    collectionSnapshots, docData
} from "@angular/fire/firestore";
import {combineLatest, from, map, Observable, of, switchMap} from "rxjs";
import {Destination} from "../../models/destination.model";

@Injectable({providedIn: 'root'})
export class CollectionsService {
    private userCollectionsPath = 'users';
    private destinationsPath    = 'destinations';

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

    getAddedByYou$(uid: string): Observable<Destination[]> {
        const destCol =
            collection(this.firestore, this.destinationsPath) as CollectionReference<Destination>;
        const q = query(destCol, where('authorId', '==', uid));
        return collectionData<Destination>(q, { idField: 'id' });
    }

    getLikedByUser$(uid: string): Observable<Destination[]> {
        const cg = collectionGroup(this.firestore, 'likes');
        const q  = query(cg, where('uid', '==', uid));

        return collectionSnapshots(q).pipe(
            switchMap(snaps => {
                const parentRefs = snaps
                    .map(s => s.ref.parent.parent as DocumentReference<Destination> | null)
                    .filter((r): r is DocumentReference<Destination> => !!r);

                if (!parentRefs.length) return of([]);

                const streams = parentRefs.map(ref =>
                    docData(ref, { idField: 'id' }) as Observable<Destination>
                );
                return combineLatest(streams);
            })
        );
    }

}