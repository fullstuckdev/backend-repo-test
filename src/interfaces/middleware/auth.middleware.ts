import { Request, Response, NextFunction } from 'express';
import { FirebaseConfig } from '../../infrastructure/config/firebase.config';
import { ApiError } from '../../utils/api-error';
import { RequestHandler } from '../types/express.types';

export class AuthMiddleware {
  static authenticate: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization?.split('Bearer ')[1];
      
      if (!token) {
        throw new ApiError(401, 'No token provided');
      }

      const auth = FirebaseConfig.getInstance().getAuth();
      const decodedToken = await auth.verifyIdToken(token);
      
      // Safe to assign as we've extended the Request type
      req.user = decodedToken;
      next();
    } catch (error) {
      next(new ApiError(401, 'Invalid token'));
    }
  };
} 