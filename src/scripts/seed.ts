import { DatabaseSeeder } from '../infrastructure/seeders';
import { FirebaseConfig } from '../infrastructure/config/firebase.config';

async function runSeeder() {
  try {
    // Initialize Firebase
    FirebaseConfig.getInstance();

    const seeder = new DatabaseSeeder();
    
    if (process.argv.includes('--clear')) {
      await seeder.clearAll();
    } else {
      await seeder.seedAll();
    }

    process.exit(0);
  } catch (error) {
    console.error('Seeder failed:', error);
    process.exit(1);
  }
}

runSeeder(); 