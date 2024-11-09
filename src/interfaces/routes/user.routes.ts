import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

const router = Router();
const userController = new UserController();

router.put(
  '/update-user-data',
  AuthMiddleware.authenticate,
  userController.updateUser
);

router.get(
  '/fetch-user-data',
  AuthMiddleware.authenticate,
  userController.fetchUser
);

export { router as userRoutes }; 