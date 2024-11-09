import { FirebaseConfig } from '../../infrastructure/config/firebase.config';

interface UserData {
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export class UserService {
  private firestore = FirebaseConfig.getInstance().getFirestore();
  private auth = FirebaseConfig.getInstance().getAuth();

  async fetchUserData(uid: string): Promise<UserData> {
    try {
      const userDoc = await this.firestore
        .collection('users')
        .doc(uid)
        .get();

      if (!userDoc.exists) {
        // Get user from Auth
        const authUser = await this.auth.getUser(uid);
        
        // Create default user document
        const defaultUserData: UserData = {
          email: authUser.email || null,
          displayName: authUser.displayName || null,
          photoURL: authUser.photoURL || null,
          role: 'user',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        // Save to Firestore
        await this.firestore
          .collection('users')
          .doc(uid)
          .set(defaultUserData);

        return defaultUserData;
      }

      return userDoc.data() as UserData;
    } catch (error) {
      console.error('Error in fetchUserData:', error);
      throw error;
    }
  }

  async updateUserData(uid: string, updateData: Partial<UserData>): Promise<void> {
    try {
      // First ensure user document exists
      await this.fetchUserData(uid);

      const updatePayload = {
        ...updateData,
        updatedAt: new Date().toISOString()
      };

      await this.firestore
        .collection('users')
        .doc(uid)
        .update(updatePayload);
    } catch (error) {
      console.error('Error in updateUserData:', error);
      throw error;
    }
  }

  // Helper method to check if user exists in Firestore
  private async userExists(uid: string): Promise<boolean> {
    const doc = await this.firestore
      .collection('users')
      .doc(uid)
      .get();
    return doc.exists;
  }
} 