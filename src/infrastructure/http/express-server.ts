import express from 'express';
import { userRoutes } from '../../interfaces/routes/user.routes';
import { errorHandler } from '../../interfaces/middleware/error.middleware';

export class ExpressServer {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    this.app.use('/api/users', userRoutes);
    this.app.use(errorHandler);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
} 