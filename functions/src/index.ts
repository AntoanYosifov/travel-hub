// functions/src/index.ts
import * as admin from "firebase-admin";
import { onDocumentDeleted } from "firebase-functions/v2/firestore";
import { logger } from "firebase-functions";

admin.initializeApp();
const db = admin.firestore();

export const onDestinationDeleted = onDocumentDeleted(
  {
    document: "destinations/{destId}",
    region: "europe-west1",
  },
  async (event) => {
    const { destId } = event.params as { destId: string };

    const likeRefs = await db
      .collection("destinations")
      .doc(destId)
      .collection("likes")
      .listDocuments();

    const batches: FirebaseFirestore.WriteBatch[] = [];
    let batch = db.batch();
    let ops = 0;

    for (const ref of likeRefs) {
      batch.delete(ref);
      if (++ops === 450) {
        batches.push(batch);
        batch = db.batch();
        ops = 0;
      }
    }
    if (ops) batches.push(batch);

    const wtvSnapById = await db
      .collectionGroup("wantToVisit")
      .where("id", "==", destId)
      .get();

    batch = db.batch();
    ops = 0;
    for (const doc of wtvSnapById.docs) {
      batch.delete(doc.ref);
      if (++ops === 450) {
        batches.push(batch);
        batch = db.batch();
        ops = 0;
      }
    }
    if (ops) batches.push(batch);

    for (const b of batches) {
      await b.commit();
    }

    logger.info(
      `Cascade delete for ${destId}: removed ${likeRefs.length} likes and ${wtvSnapById.size} wantToVisit docs`
    );
  }
);
