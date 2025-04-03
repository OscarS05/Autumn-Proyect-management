# Autumn API

Autumn is an API for collaborative project management inspired by Trello. It is built using **Node.js, Express.js, PostgreSQL, JWT authentication, Redis for caching, Sequelize ORM, and Docker**. The project follows **SOLID principles, Clean Architecture, and Domain-Driven Design (DDD)** to ensure maintainability and scalability.

## Technologies Used
- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Sequelize ORM** - Object-Relational Mapping
- **Redis** - Caching system
- **JWT Authentication** - Secure authentication
- **Passport.js** - Authentication middleware
- **Docker** - Containerized environment
- **Winston & Morgan** - Logging and performance monitoring
- **Nodemailer** - Email service
- **Joi** - Data validation
- **Express-rate-limit** - Rate limiting middleware

## Authentication System
Autumn implements a **JWT-based authentication system** with access and refresh tokens. A key feature of this system is **auto-authentication**: as long as the refresh token remains valid, the user session remains active indefinitely. However, if the user does not log in for **15 consecutive days**, the refresh token will expire and and re-authentication will be required.

## Project Structure
The project follows **Clean Architecture and Domain-Driven Design (DDD)** principles. The `api/src/` directory is structured as follows:
```
api/src/
├── application/
│   ├── dtos/
│   ├── services/
│   └── use-cases/
├── domain/
│   ├── repositories/ (contracts)
│   ├── entities/
│   └── value-objects/
├── infrastructure/
│   ├── adapters/
│   ├── repositories/ (implementations)
│   └── store/ (DB, ORM, cache configuration)
├── interfaces/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   └── schemas/
├── config/ (environment variables)
└── utils/ (helpers)
```

## The Frontend
Initially, Autumn was designed as a **full-stack** project with a frontend built in **Vanilla JavaScript**. However, as the focus of the project shifted towards **backend development**, the frontend was discontinued. The **`public/`** directory still contains frontend files, but they are no longer maintained or developed further.

## How to Run the Project
### Prerequisites
- **Docker** installed on your machine
- **Node.js** and **npm** installed

### Setup and Installation
1. Clone the repository:
   ```bash
   git clone git@github.com:OscarS05/Autumn-Proyect-management.git
   cd autumn
   ```
2. Create a **.env** file based on the provided `.env.example`.
3. Start the services using Docker Compose:
   ```bash
   docker-compose up -d
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Run database migrations:
   ```bash
   npm run migrations:run
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts
```json
"scripts": {
  "dev": "nodemon api/index.js",
  "start": "node api/index.js",
  "lint": "eslint",
  "migrations:generate": "sequelize-cli migration:generate --name",
  "migrations:run": "sequelize-cli db:migrate",
  "migrations:revert": "sequelize-cli db:migrate:undo",
  "migrations:delete": "sequelize-cli db:migrate:undo:all",
  "environment:status": "sequelize-cli db:migrate:status"
}
```

## Project Status
Autumn is still in **active development**. The backend is fully functional for authentication, user management, and workspace/project/team CRUD operations. The remaining features under development include:

- **CRUD for:** Team members, lists, cards, card members, labels, label colors, attachments, checklists, checklist items, and checklist item members.
- **Real-time chat for projects using Socket.io**.
- **Comprehensive testing implementation**.

Once all planned features are completed, **API documentation will be added using Swagger**.

---
This project is a work in progress, but all completed features are fully functional. 🚀
