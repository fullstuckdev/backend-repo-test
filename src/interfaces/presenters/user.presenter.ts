import { User } from '../../domain/entities/user.entity';

export class UserPresenter {
  toResponse(user: User) {
    return {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    };
  }

  success(message: string) {
    return {
      success: true,
      message
    };
  }

  error(message: string) {
    return {
      success: false,
      error: message
    };
  }
} 