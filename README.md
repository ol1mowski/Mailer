# Mailer - Email Campaign Management System

A comprehensive email campaign management system built with modern web technologies. This application provides a robust platform for managing mailing lists, creating campaigns, and tracking email performance.

## 🚀 Features

- **User Authentication & Authorization** - Secure login system with role-based access
- **Dashboard** - Intuitive interface for campaign management
- **Email Campaign Management** - Create, edit, and schedule email campaigns
- **Mailing List Management** - Organize and segment your subscriber lists
- **Real-time Analytics** - Track campaign performance and engagement metrics
- **Responsive Design** - Optimized for desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features and improved performance
- **TypeScript 5.8** - Type-safe development with enhanced developer experience
- **Vite 7** - Fast build tool and development server
- **TailwindCSS 3.3** - Utility-first CSS framework for rapid UI development
- **React Hook Form 7** - Performant forms with easy validation
- **Zod 4.0** - TypeScript-first schema validation
- **Vitest 3.2** - Fast unit testing framework
- **ESLint 9** - Code quality and consistency

### Backend
- **Spring Boot 3** - Modern Java framework for building web applications
- **Java 17** - Latest LTS version with enhanced features
- **Spring Security** - Comprehensive security framework
- **Spring Data JPA** - Data access layer with JPA/Hibernate
- **Maven** - Dependency management and build tool
- **JUnit 5** - Unit testing framework

## 📁 Project Structure

```
Mailer/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── auth/       # Authentication components
│   │   │   ├── dashboard/  # Dashboard components
│   │   │   └── ui/         # Base UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   └── test/           # Test setup and utilities
│   ├── public/             # Static assets
│   └── dist/               # Build output
├── server/                 # Backend Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/       # Java source code
│   │   │   └── resources/  # Configuration files
│   │   └── test/           # Test files
│   └── target/             # Build output
└── .github/                # GitHub Actions workflows
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and **npm** for frontend development
- **Java 17+** and **Maven** for backend development
- **Git** for version control

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm run test:run
   ```

5. Build for production:
   ```bash
   npm run build
   ```

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Build the project:
   ```bash
   ./mvnw clean install
   ```

3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

4. Run tests:
   ```bash
   ./mvnw test
   ```

## 🧪 Testing

### Frontend Testing
- **Unit Tests**: `npm run test:run`
- **Coverage**: `npm run test:coverage`
- **UI Testing**: `npm run test:ui`

### Backend Testing
- **Unit Tests**: `./mvnw test`
- **Integration Tests**: `./mvnw verify`

## 📦 CI/CD Pipeline

The project includes GitHub Actions workflows for:

- **Automated Testing** - Runs on every push and pull request
- **Code Quality Checks** - ESLint and TypeScript validation
- **Security Audits** - Dependency vulnerability scanning
- **Build Verification** - Ensures code compiles successfully
- **Deployment** - Automated deployment to staging/production

## 🔧 Development Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run test:run     # Run tests
npm run test:coverage # Run tests with coverage
npm run preview      # Preview production build
```

### Backend
```bash
./mvnw spring-boot:run    # Run Spring Boot application
./mvnw clean install      # Clean and install dependencies
./mvnw test              # Run tests
./mvnw verify            # Run integration tests
```

## 🏗️ Architecture

### Frontend Architecture
- **Component-Based**: Modular, reusable components
- **Type Safety**: Full TypeScript integration
- **State Management**: React hooks for local state
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: TailwindCSS for consistent design system

### Backend Architecture
- **RESTful API**: Clean, RESTful endpoints
- **Layered Architecture**: Controller → Service → Repository
- **Security**: Spring Security with JWT authentication
- **Data Access**: Spring Data JPA with Hibernate
- **Validation**: Bean Validation for input validation

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - Granular permissions
- **Input Validation** - Server-side validation with Zod/Bean Validation
- **CORS Configuration** - Cross-origin resource sharing setup
- **Security Headers** - Protection against common vulnerabilities

## 📊 Performance

- **Frontend**: Vite for fast development and optimized builds
- **Backend**: Spring Boot with optimized JVM settings
- **Database**: Efficient queries with JPA/Hibernate
- **Caching**: Spring Cache for improved response times

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation in the `/docs` folder

## 🔄 Version History

- **v1.0.0** - Initial release with basic email campaign management
- **v1.1.0** - Added analytics and reporting features
- **v1.2.0** - Enhanced security and performance improvements

---

Built with ❤️ using modern web technologies