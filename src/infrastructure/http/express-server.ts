import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { userRoutes } from '../../interfaces/routes/user.routes';
import { devRoutes } from '../../interfaces/routes/dev.routes';
import { errorHandler } from '../../interfaces/middleware/error.middleware';
import { swaggerSpec } from '../config/swagger.config';

export class ExpressServer {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupSwagger();
    this.setupRoutes();
  }

  private setupSwagger(): void {
    const options: swaggerUi.SwaggerUiOptions = {
      explorer: true,
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: "API Documentation",
      swaggerOptions: {
        persistAuthorization: true,
        docExpansion: 'list',
        filter: true,
        displayRequestDuration: true,
      }
    };

    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, options)
    );
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    this.app.use('/api/users', userRoutes);
    if (process.env.NODE_ENV !== 'production') {
      this.app.use('/api/dev', devRoutes);
    }
    this.app.use(errorHandler);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
    });
  }
} 