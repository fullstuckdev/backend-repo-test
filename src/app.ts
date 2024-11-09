import { ExpressServer } from './infrastructure/http/express-server';
import { AppConfig } from './infrastructure/config/app.config';
import { FirebaseConfig } from './infrastructure/config/firebase.config';

try {
  // Initialize configurations
  const config = AppConfig.getInstance();
  FirebaseConfig.getInstance(); // Initialize Firebase

  // Start server
  const server = new ExpressServer();
  server.start(config.port);
} catch (error) {
  console.error('Failed to start application:', error);
  process.exit(1);
}
