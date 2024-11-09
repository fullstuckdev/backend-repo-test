export function validateEnv() {
  const required = [
    'FIREBASE_PROJECT_ID',
    'FIREBASE_PRIVATE_KEY',
    'FIREBASE_CLIENT_EMAIL'
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  if (!process.env.FIREBASE_PRIVATE_KEY?.includes('BEGIN PRIVATE KEY')) {
    throw new Error('Invalid FIREBASE_PRIVATE_KEY format');
  }
} 