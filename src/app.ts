import { ExpressServer } from './infrastructure/http/express-server';
import { FirebaseConfig } from './infrastructure/config/firebase.config';
import dotenv from 'dotenv';

dotenv.config();

async function startApp() {
  try {
    // Initialize Firebase first
    const firebase = FirebaseConfig.getInstance();
    
    // Test Firebase connection
    const auth = firebase.getAuth();
    await auth.listUsers(1);
    
    console.log('Firebase connection verified');

    // Start server
    const server = new ExpressServer();
    const port = parseInt(process.env.PORT || '3000', 10);
    server.start(port);
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}

startApp();
