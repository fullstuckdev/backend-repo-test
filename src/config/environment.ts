import { cleanEnv, str, port } from 'envalid';

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
  PORT: port({ default: 3000 }),
  FIREBASE_PROJECT_ID: str(),
  FIREBASE_PRIVATE_KEY: str(),
  FIREBASE_CLIENT_EMAIL: str(),
  FIREBASE_API_KEY: str()
}); 