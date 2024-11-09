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
      const user = req.user;
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      const updateData = req.body;

      // Validate update data
      const allowedFields = ['displayName', 'photoURL'];
      const filteredData = Object.keys(updateData)
        .filter(key => allowedFields.includes(key))
        .reduce((obj: any, key: string) => {
          obj[key] = updateData[key];
          return obj;
        }, {});

      await this.userService.updateUserData(user.uid, filteredData);

      // Fetch updated data
      const updatedUserData = await this.userService.fetchUserData(user.uid);

      return res.status(200).json({
        success: true,
        message: 'User data updated successfully',
        data: updatedUserData
      });

    } catch (error: any) {
      console.error('Error updating user data:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to update user data',
        details: error.message
      });
    }
  }
} 