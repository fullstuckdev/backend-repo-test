import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './interfaces/routes/user.routes';
import { errorHandler } from './interfaces/middleware/error.middleware';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
