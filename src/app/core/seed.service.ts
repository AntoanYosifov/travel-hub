import {Injectable} from "@angular/core";
import {addDoc, collection, Firestore, getDocs} from "@angular/fire/firestore";
import {Destination} from "../models/destination.model";

@Injectable({providedIn: 'root'})
export class SeedService {
    private colPath = 'destinations';

    constructor(private firestore: Firestore) {}

    async seedOnce() {
        const colRef = collection(this.firestore, this.colPath);
        const snap = await getDocs(colRef);
        if (!snap.empty) {
            console.log('🛑 Destinations already seeded—skipping.');
            return;
        }

        console.log('🚀 Seeding example destinations…');
        const examples: Omit<Destination, 'id'>[] = [
            {
                locationName: 'Paris, France',
                imgUrl: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/474000/474240-Left-Bank-Paris.jpg',
                photoCredit: 'Photo by Alice'
            },
            {
                locationName: 'Kyoto, Japan',
                imgUrl: 'https://i0.wp.com/www.touristjapan.com/wp-content/uploads/2025/01/map-of-kyoto-japan-travel.jpg?resize=1024%2C683&ssl=1',
                photoCredit: 'Photo by Bob'
            },
            {
                locationName: 'Machu Picchu, Peru',
                imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Machu_Picchu%2C_Peru_%282018%29.jpg/500px-Machu_Picchu%2C_Peru_%282018%29.jpg',
                photoCredit: 'Photo by Carol'
            }
        ];

        for (const dest of examples) {
            await addDoc(colRef, dest);
        }
        console.log('✅ Seeding complete.');
    }

}