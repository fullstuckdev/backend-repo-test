import { firestore } from 'firebase-admin';

export interface FirestoreData {
  [key: string]: any;
}

export interface FirestoreUserData {
  id: string;
  email: string;
  name: string;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
}

export type FirestoreUserInput = Omit<FirestoreUserData, 'id'>;