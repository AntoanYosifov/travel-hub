export interface Destination {
    id?: string;
    locationName: string;
    description: string;
    imgUrl: string;

    authorId: string;
    authorName: string;

    storagePath?: string;

    /** legacy: present on older docs; safe to keep optional so reading won’t break */
    photoCredit?: string;
}
