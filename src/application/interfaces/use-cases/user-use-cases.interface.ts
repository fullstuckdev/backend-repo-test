import { User } from '../../../domain/entities/user.entity';

export interface IUpdateUserUseCase {
  execute(userId: string, data: UpdateUserDTO): Promise<void>;
}

export interface IFetchUserUseCase {
  execute(userId: string): Promise<User>;
}

export interface UpdateUserDTO {
  name?: string;
} 