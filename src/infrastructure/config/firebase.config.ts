import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

export class FirebaseConfig {
  private static instance: FirebaseConfig;
  private app: admin.app.App;

  private constructor() {
    try {
      const privateKey = process.env.FIREBASE_PRIVATE_KEY!
        .replace(/\\n/g, '\n')
        .replace(/"/g, '');

      const serviceAccount = {
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key: privateKey,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
      };

      console.log('Private key starts with:', privateKey.substring(0, 50));

      if (!admin.apps.length) {
        this.app = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
        });
        console.log('Firebase app initialized successfully');
      } else {
        this.app = admin.app();
        console.log('Using existing Firebase app');
      }

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

  public getApp(): admin.app.App {
    return this.app;
  }

  public getAuth(): admin.auth.Auth {
    return this.app.auth();
  }

  public getFirestore(): admin.firestore.Firestore {
    return this.app.firestore();
  }
}