import {Injectable} from "@angular/core";
import {collection, collectionData, CollectionReference, Firestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
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
}