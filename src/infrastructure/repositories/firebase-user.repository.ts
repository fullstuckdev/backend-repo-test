import { IUserRepository } from '../../application/interfaces/repositories/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { FirebaseConfig } from '../config/firebase.config';

export class FirebaseUserRepository implements IUserRepository {
  private readonly db: FirebaseFirestore.Firestore;
  private readonly COLLECTION = 'USERS';

  constructor() {
    this.db = FirebaseConfig.getInstance().getFirestore();
  }

  async findById(id: string): Promise<User | null> {
    try {
      const doc = await this.db.collection(this.COLLECTION).doc(id).get();
      
      if (!doc.exists) return null;
      
      const data = doc.data()!;
      return User.create({
        id: doc.id,
        email: data.email,
        name: data.name,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      });
    } catch (error) {
      throw new Error('Failed to fetch user from database');
    }
  }

  async update(user: User): Promise<void> {
    try {
      await this.db.collection(this.COLLECTION).doc(user.id).update(user.toJSON());
    } catch (error) {
      throw new Error('Failed to update user in database');
    }
  }
} 