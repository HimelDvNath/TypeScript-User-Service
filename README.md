# TypeScript User Service
*A Modern User Management REST API with Express.js & TypeScript*

A clean, well-structured **Express.js** backend API for user management with
full CRUD functionality. Built with **TypeScript** for type safety, following
best practices with a layered architecture (Routes → Controller → Service).
Perfect for learning REST API design patterns or as a starter template.

---

## ✨ Features

- **Complete CRUD Operations**: Create, Read, Update, Delete users
- **TypeScript**: Full type safety with comprehensive interfaces
- **Clean Architecture**: Well-organized Routes/Controller/Service pattern
- **Error Handling**: Structured error responses with proper HTTP status codes

---

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/users` | Create a new user |
| **GET** | `/api/users` | Get all users |
| **GET** | `/api/users/:id` | Get user by ID |
| **PUT** | `/api/users/:id` | Update user |
| **DELETE** | `/api/users/:id` | Delete user |

---
## 🏗️ Project Structure
```bash
src/
├── index.ts                    # Express app entry point
├── controllers/
│   └── user.controller.ts     # Request handlers for user routes
├── services/
│   └── user.service.ts        # Business logic & data operations
├── routes/
│   └── user.routes.ts         # API route definitions
├── types/
│   └── user.types.ts          # TypeScript interfaces & types
└── middleware/                # Custom middleware (empty, ready to extend)
```
---
## 🚀 Getting started

### Installation
1. **Clone the repository**
   ```bash
   git clone <project-repo-url>
   cd TypeScript-User-Service
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment**
   ```bash
   PORT
   ```
4. **Run in development mode**
   ```bash
   npm run dev
   ```
