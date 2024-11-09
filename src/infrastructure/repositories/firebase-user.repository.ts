import { IUserRepository } from '../../application/interfaces/repositories/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { FirebaseConfig } from '../config/firebase.config';
import { UserMapper } from '../mappers/user.mapper';
import { ApiError } from '../../utils/api-error';
import { FirestoreUserData } from '../../interfaces/types/firestore.types';

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
      
      const data = doc.data()! as Omit<FirestoreUserData, 'id'>;
      return UserMapper.toDomain({
        id: doc.id,
        email: data.email,
        name: data.name,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      });
    } catch (error) {
      throw new ApiError(500, 'Failed to fetch user from database');
    }
  }

  async update(user: User): Promise<void> {
    try {
      const data = UserMapper.toFirestore(user);
      const { id, ...updateData } = data; // Remove id from update data
      await this.db.collection(this.COLLECTION).doc(data.id).update(updateData);
    } catch (error) {
      throw new ApiError(500, 'Failed to update user in database');
    }
  }
} 