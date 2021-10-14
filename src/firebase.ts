import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";
import {
  onSnapshot,
  collection,
  getFirestore,
  DocumentData,
  query,
  orderBy,
  limit,
} from "@firebase/firestore";
import { HangEvent } from "./features/hangboard/hangInterfaces";

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const db = getFirestore();
export const auth = getAuth(app);
export const hangEventsCollection = collection(db, "hang_events");
export default app;

export const hangEventFromFirestore = (doc: DocumentData): HangEvent => {
  const newHangEvent: HangEvent = {
    aveWeight: doc.aveWeight,
    device: doc.device,
    endTime: doc.endTime.toDate(),
    maxWeight: doc.maxWeight,
    recvTime: doc.recvTime.toDate(),
    startTime: doc.startTime.toDate(),
    user: doc.user,
    t: doc.t,
    weight: doc.weight,
  };
  return newHangEvent;
};

export const onHangEvents = (
  action: (he: HangEvent[]) => void,
  eventLimit: number
): (() => void) => {
  const q = query(
    hangEventsCollection,
    orderBy("startTime", "desc"),
    limit(eventLimit)
  );
  const cancelSnapshotListen = onSnapshot(q, (querySnapshot) => {
    const items: HangEvent[] = [];
    querySnapshot.forEach((doc) => {
      items.push(hangEventFromFirestore(doc.data()));
    });
    action(items);
  });
  if (cancelSnapshotListen) {
    return cancelSnapshotListen;
  }
  return () => {};
};
