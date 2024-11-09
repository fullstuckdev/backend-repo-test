import { Request, Response, NextFunction } from 'express';
import { UpdateUserUseCase, UpdateUserDTO } from '../../application/use-cases/user/update-users.use-case';
import { IFetchUsersUseCase } from '../../application/interfaces/use-cases/user-use-cases.interface';
import { FirebaseUserRepository } from '../../infrastructure/repositories/firebase-user.repository';
import { FetchUsersUseCase } from '../../application/use-cases/user/fetch-users.use-case';

export class UserController {
  private updateUserUseCase: UpdateUserUseCase;
  private fetchUsersUseCase: IFetchUsersUseCase;

  constructor() {
    const userRepository = new FirebaseUserRepository();
    this.updateUserUseCase = new UpdateUserUseCase(userRepository);
    this.fetchUsersUseCase = new FetchUsersUseCase(userRepository);
  }

  async updateUserData(req: Request, res: Response, next: NextFunction) {
    try {
      const authenticatedUser = req.user;
      if (!authenticatedUser) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      const userId = req.params.id;
      const updateData = req.body;

      const allowedFields = ['displayName', 'photoURL', 'role', 'isActive'];
      const filteredData = Object.keys(updateData)
        .filter(key => allowedFields.includes(key))
        .reduce((obj: any, key: string) => {
          obj[key] = updateData[key];
          return obj;
        }, {} as UpdateUserDTO);

      const updatedUser = await this.updateUserUseCase.execute(userId, filteredData);

      return res.status(200).json({
        success: true,
        message: 'User data updated successfully',
        data: updatedUser.toJSON()
      });

    } catch (error: any) {
      console.error('Error updating user data:', error);
      if (error.message === 'User not found') {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
      return res.status(500).json({
        success: false,
        error: 'Failed to update user data',
        details: error.message
      });
    }
  }

  async fetchUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.fetchUsersUseCase.execute();

      return res.status(200).json({
        success: true,
        data: result.users,
        total: result.total,
        message: 'Users fetched successfully'
      });

    } catch (error: any) {
      console.error('Error fetching users:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch users',
        details: error.message
      });
    }
  }
} 