import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

export class FirebaseConfig {
  private static instance: FirebaseConfig;
  private readonly firestore: admin.firestore.Firestore;
  private readonly auth: admin.auth.Auth;

  private constructor() {
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    };

    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
      });

      this.firestore = admin.firestore();
      this.auth = admin.auth();

      console.log('Firebase initialized successfully');
    } catch (error) {
      console.error('Error initializing Firebase:', error);
      throw error;
    }
  }

  public static getInstance(): FirebaseConfig {
    if (!FirebaseConfig.instance) {
      FirebaseConfig.instance = new FirebaseConfig();
    }
    return FirebaseConfig.instance;
  }

  public getFirestore(): admin.firestore.Firestore {
    return this.firestore;
  }

  public getAuth(): admin.auth.Auth {
    return this.auth;
  }
} 