import { User } from '../../../domain/entities/user.entity';
import { IUserRepository } from '../../interfaces/repositories/user-repository.interface';

export interface UpdateUserDTO {
  name?: string;
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string, data: UpdateUserDTO): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (data.name) {
      user.updateName(data.name);
    }

    await this.userRepository.update(user);
  }
} 