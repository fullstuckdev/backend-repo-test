import * as admin from 'firebase-admin';

export class FirebaseConfig {
  private static instance: FirebaseConfig;
  private readonly firestore: admin.firestore.Firestore;
  private readonly auth: admin.auth.Auth;

  private constructor() {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}'
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    this.firestore = admin.firestore();
    this.auth = admin.auth();
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