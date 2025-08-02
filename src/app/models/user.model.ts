import {FieldValue, serverTimestamp, Timestamp} from "@angular/fire/firestore";


export interface UserModel {
    uid: string;
    displayName: string;
    email: string;
    photoUrl?: string;
    createdAt: Timestamp|FieldValue
    updatedAt: Timestamp|FieldValue;
}


export const UserProfileDefaults = {
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
};

