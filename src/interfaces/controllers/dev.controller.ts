import { Request, Response, NextFunction } from 'express';
import { FirebaseConfig } from '../../infrastructure/config/firebase.config';
import { ApiError } from '../../utils/api-error';
import axios from 'axios';

export class DevController {
  private readonly TEST_EMAIL = 'test@example.com';
  private readonly TEST_PASSWORD = 'Test123!@#';
  private readonly FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;

  async generateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = FirebaseConfig.getInstance().getAuth();
      
      let userRecord;

      try {
        userRecord = await auth.getUserByEmail(this.TEST_EMAIL);
        console.log('Found existing user:', userRecord.uid);
      } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
          userRecord = await auth.createUser({
            email: this.TEST_EMAIL,
            password: this.TEST_PASSWORD,
            emailVerified: true
          });
          console.log('Created new user:', userRecord.uid);
        } else {
          throw error;
        }
      }

      // First, create a custom token
      const customToken = await auth.createCustomToken(userRecord.uid);

      // Exchange custom token for ID token
      const response = await axios.post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${this.FIREBASE_API_KEY}`,
        {
          token: customToken,
          returnSecureToken: true
        }
      );

      const idToken = response.data.idToken;
      
      return res.status(200).json({
        success: true,
        data: {
          userId: userRecord.uid,
          email: userRecord.email,
          token: idToken,
          bearerToken: `Bearer ${idToken}`,
          expiresIn: response.data.expiresIn
        },
        message: 'Token generated successfully'
      });

    } catch (error: any) {
      console.error('Error in generateToken:', error);
      if (axios.isAxiosError(error)) {
        console.error('API Error details:', error.response?.data);
        return res.status(500).json({
          success: false,
          error: 'Failed to generate token',
          details: error.response?.data
        });
      }
      return res.status(500).json({
        success: false,
        error: error.message,
        code: error.code,
        details: error
      });
    }
  }
} 