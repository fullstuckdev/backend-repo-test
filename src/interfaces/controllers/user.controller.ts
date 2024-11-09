import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../domain/services/user.service';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async fetchUserData(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      try {
        const userData = await this.userService.fetchUserData(user.uid);

        return res.status(200).json({
          success: true,
          data: userData
        });
      } catch (error: any) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({
          success: false,
          error: 'Failed to fetch user data',
          details: error.message
        });
      }
    } catch (error) {
      next(error);
    }
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
      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required'
        });
      }

      if (authenticatedUser.role !== 'admin' && authenticatedUser.uid !== userId) {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to update this user'
        });
      }

      const updateData = req.body;

      const allowedFields = ['displayName', 'photoURL', 'role', 'isActive'];
      const filteredData = Object.keys(updateData)
        .filter(key => allowedFields.includes(key))
        .reduce((obj: any, key: any) => {
          obj[key] = updateData[key];
          return obj;
        }, {});

      const updatedUserData = await this.userService.updateUserData(userId, filteredData);

      return res.status(200).json({
        success: true,
        message: 'User data updated successfully',
        data: updatedUserData
      });

    } catch (error: any) {
      console.error('Error updating user data:', error);
      if (error.code === 'auth/user-not-found') {
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
      const { users, total } = await this.userService.fetchAllUsers();

      if (total < 10) {
        const seeder = require('../../scripts/seed');
        await seeder.main();
        const newResult = await this.userService.fetchAllUsers();
        return res.status(200).json({
          success: true,
          data: newResult.users,
          total: newResult.total,
          message: 'Users fetched successfully (with additional seeded users)'
        });
      }

      return res.status(200).json({
        success: true,
        data: users,
        total,
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