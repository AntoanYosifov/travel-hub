import {Injectable} from "@angular/core";
import {
    addDoc,
    collection,
    collectionData,
    CollectionReference,
    doc,
    docData,
    DocumentReference,
    Firestore
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
        let docRef = doc(this.firestore, `destinations/${id}`) as DocumentReference<Destination>;
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
}