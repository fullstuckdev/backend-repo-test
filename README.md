# 🚀 Backend Service with Firebase

![Nodemon](https://img.shields.io/badge/Nodemon-3.1.7-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue)
![Types-Faker](https://img.shields.io/badge/Types--Faker-6.6.11-blue)
![Axios](https://img.shields.io/badge/Axios-1.7.7-blue)
![Class-Transformer](https://img.shields.io/badge/Class--Transformer-0.5.1-blue)
![Class-Validator](https://img.shields.io/badge/Class--Validator-0.14.1-blue)
![Dotenv](https://img.shields.io/badge/Dotenv-16.4.5-blue)
![Envalid](https://img.shields.io/badge/Envalid-8.0.0-blue)
![Express-Rate-Limit](https://img.shields.io/badge/Express--Rate--Limit-7.4.1-blue)
![Firebase-Admin](https://img.shields.io/badge/Firebase--Admin-12.7.0-orange)
![Firebase-Functions](https://img.shields.io/badge/Firebase--Functions-6.1.0-orange)
![Firebase-Tools](https://img.shields.io/badge/Firebase--Tools-13.24.2-orange)
![Helmet](https://img.shields.io/badge/Helmet-8.0.0-blue)


A robust Node.js backend service built with TypeScript, Express, and Firebase, implementing Clean Architecture principles and following modern development practices.

### Core Features
- 🧹 **Clean Architecture** implementation
- 🔐 **Firebase Authentication** & 🔥 **Firestore** integration
- 📜 **Swagger** API documentation
- ⏱️ Rate limiting and security middleware
- ✅ Environment validation
- ✨ TypeScript decorators for routing
- 🧩 Dependency injection with **InversifyJS**
- ⚠️ Comprehensive error handling
- 🌐 Local development with **Firebase emulators**

### API Features
- 👥 User management (CRUD operations)
- 🔐 Authentication with Firebase
- 🩺 Health check endpoints
- 🔧 Development helper endpoints
- 📖 Swagger UI documentation

🛠️ Technical Stack

### Core
- 🖥️ **Node.js**
- 📝 **TypeScript**
- 🚀 **Express.js**
- 🔥 **Firebase Admin SDK**

### Architecture & Design
- 🧱 **Clean Architecture**
- 🧩 **Dependency Injection** (InversifyJS)
- 🗃️ **Repository Pattern**
- 📐 **SOLID Principles**

### Documentation & Validation
- 📝 **Swagger/OpenAPI**
- 🔍 **Class Validator**
- 🛠️ **Class Transformer**

### Security
- 🛡️ **Helmet**
- 🔒 **Express Rate Limit**
- 🔐 **Firebase Authentication**
- 🌍 **CORS protection**

### Development
- 🔥 **Firebase Emulators**
- 👀 **Nodemon**
- 🧹 **ESLint**
- 📝 **TypeScript**

📋 Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Firebase project and credentials**
- **Firebase CLI tools**
- **Firebase emulators** (for local development)

🚀 Getting Started

1. **Clone the repository**
```bash
git clone <repository-url>
cd backend-service
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
FB_PROJECT_ID=your-project-id
FB_PRIVATE_KEY=your-private-key
FB_CLIENT_EMAIL=your-client-email
FB_API_KEY=your-api-key
IS_EMULATOR=true
```

4. **Validate Environment**
```bash
npm run validate-env
```

5. **Check Firebase Credentials**
```bash
npm run check-creds
```

6. **Start Development Server**
```bash
npm run dev
```

📚 API Documentation

The API documentation is available via Swagger UI when the server is running:
```
http://localhost:3000/api-docs
```

### Available Endpoints

#### User Management
- `GET /v1/users/fetch-users-data` - Fetch all users
- `PUT /v1/users/update-user-data/:id` - Update user data

#### Development
- `GET /v1/generate-token` - Generate test token
- `GET /v1/health` - Check service health
- `GET /v1/health/detailed` - Detailed health check

🏗️ Project Structure

```
src/
├── application/           # Application business rules
│   ├── dtos/             # Data Transfer Objects
│   ├── interfaces/       # Abstract interfaces
│   └── use-cases/        # Use case implementations
│
├── domain/               # Enterprise business rules
│   ├── entities/         # Domain entities
│   └── services/         # Domain services
│
├── infrastructure/       # Frameworks & tools
│   ├── config/          # Configuration files
│   ├── decorators/      # Custom decorators
│   ├── di/              # Dependency injection setup
│   ├── middleware/      # Express middleware
│   ├── repositories/    # Repository implementations
│   └── seeders/         # Database seeders
│
├── interfaces/          # Interface adapters
│   ├── controllers/     # Express controllers
│   ├── middleware/      # Interface-specific middleware
│   ├── presenters/      # Response presenters
│   └── routes/          # Route definitions
└── utils/              # Utility functions and helpers
```

🛠️ Development Commands

```bash
# Start development server with emulators
npm run dev

# Build the project
npm run build

# Watch mode build
npm run build:watch

# Start Firebase emulators
npm run emulator

# Seed database
npm run seed

# Clear seeded data
npm run seed:clear

# Generate test token
npm run generate-test-token

# Validate environment
npm run validate-env

# Check Firebase credentials
npm run check-creds
```

🔒 Security Features

1. **Authentication**
   - JWT token validation
   - Firebase Authentication integration
   - Custom middleware for route protection

2. **Request Security**
   - Helmet for HTTP headers
   - Rate limiting
   - CORS configuration
   - Request ID tracking

3. **Data Validation**
   - DTO validation
   - Input sanitization
   - Type checking

🧪 Testing

The project includes a comprehensive test suite:
```bash
npm test
```

🔧 Configuration

### Firebase Configuration
The service uses Firebase Admin SDK and requires proper credentials. Configuration is handled through environment variables and the `FirebaseConfig` class.

### Environment Variables
- `FB_PROJECT_ID`: Firebase project ID
- `FB_PRIVATE_KEY`: Firebase private key
- `FB_CLIENT_EMAIL`: Firebase client email
- `FB_API_KEY`: Firebase API key
- `IS_EMULATOR`: Enable/disable Firebase emulator mode

📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
👥 Authors
**Taufik Mulyawan** - [taufikmulyawan@gmail.com](mailto:taufikmulyawan@gmail.com)
