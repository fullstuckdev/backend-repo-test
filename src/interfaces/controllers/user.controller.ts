import { Response, NextFunction } from 'express';
import { IUpdateUserUseCase, IFetchUserUseCase } from '../../application/interfaces/use-cases/user-use-cases.interface';
import { UserPresenter } from '../presenters/user.presenter';
import { FirebaseUserRepository } from '../../infrastructure/repositories/firebase-user.repository';
import { AuthenticatedRequestHandler } from '../types/express.types';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-user.use-case';
import { FetchUserUseCase } from '../../application/use-cases/user/fetch-user.use-case';
export class UserController {
  private updateUserUseCase: IUpdateUserUseCase;
  private fetchUserUseCase: IFetchUserUseCase;
  private userPresenter: UserPresenter;

  constructor() {
    const userRepository = new FirebaseUserRepository();
    this.updateUserUseCase = new UpdateUserUseCase(userRepository);
    this.fetchUserUseCase = new FetchUserUseCase(userRepository);
    this.userPresenter = new UserPresenter();
  }

  updateUser: AuthenticatedRequestHandler = async (req, res, next) => {
    try {
      const userId = req.user.uid;
      await this.updateUserUseCase.execute(userId, req.body);
      
      res.status(200).json(
        this.userPresenter.success('User updated successfully')
      );
    } catch (error) {
      next(error);
    }
  };

  fetchUser: AuthenticatedRequestHandler = async (req, res, next) => {
    try {
      const userId = req.user.uid;
      const user = await this.fetchUserUseCase.execute(userId);
      
      res.status(200).json(
        this.userPresenter.toResponse(user)
      );
    } catch (error) {
      next(error);
    }
  };
} 