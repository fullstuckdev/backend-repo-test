import { User } from '../../domain/entities/user.entity';
import { UserDTO } from '../../interfaces/types/user.types';
import { FirestoreUserData, FirestoreUserInput } from '../../interfaces/types/firestore.types';
import { firestore } from 'firebase-admin';

export class UserMapper {
  static toFirestore(user: User): FirestoreUserData {
    const dto = user.toJSON();
    return {
      id: dto.id,
      email: dto.email,
      name: dto.name,
      createdAt: firestore.Timestamp.fromDate(dto.createdAt),
      updatedAt: firestore.Timestamp.fromDate(dto.updatedAt)
    };
  }

  static toFirestoreUpdate(user: User): FirestoreUserInput {
    const dto = user.toJSON();
    return {
      email: dto.email,
      name: dto.name,
      createdAt: firestore.Timestamp.fromDate(dto.createdAt),
      updatedAt: firestore.Timestamp.fromDate(dto.updatedAt)
    };
  }

  static toDomain(data: FirestoreUserData): User {
    return User.create({
      id: data.id,
      email: data.email,
      name: data.name,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    });
  }
} 