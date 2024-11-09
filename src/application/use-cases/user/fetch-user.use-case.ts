import { User } from '../../../domain/entities/user.entity';
import { IUserRepository } from '../../interfaces/repositories/user-repository.interface';

export class FetchUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
} 