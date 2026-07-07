# Admin User Management App

A full-stack **MERN** application for user and admin management, built with a **type-safe, clean/layered architecture** on the backend (Repository Pattern) and a modern **React + shadcn/ui** frontend.

Users can register, verify their account via OTP, log in (including Google OAuth), manage their profile and password, and upload a profile picture. Admins get a dedicated dashboard to view, add, edit, block/unblock, and delete users.

## ✨ Features

### User
- Register with email/password
- OTP-based email verification on signup
- Login with email/password or **Google OAuth**
- JWT-based authentication with access & refresh tokens (via cookies)
- Forgot/reset password flow with OTP verification
- Edit profile details
- Upload/update profile picture (stored on Cloudinary)
- Resend OTP support

### Admin
- Admin login (shares auth flow with users, gated by role)
- Dashboard to view all registered users
- Add new users
- Edit user details
- Block / unblock (toggle status) users
- Delete users
- Role-based access control restricting admin routes to admin accounts only

## 🏗️ Architecture

The backend follows a **clean, layered architecture** using the **Repository Pattern** with dependency injection, giving clear separation of concerns and end-to-end type safety with TypeScript:

```
Routes → Controllers → Services → Repositories → Models (MongoDB)
```

- **Routes** – define API endpoints and wire up middlewares
- **Controllers** – handle HTTP request/response, delegate to services
- **Services** – contain business logic, implement interfaces (`IUserService`, `IAdminService`)
- **Repositories** – handle data access, implement interfaces (`IUserRepository`, `IAdminRepository`)
- **Models** – Mongoose schemas
- **DTOs / Entities** – shape data moving between layers
- **DI containers** (`di/container.ts`, `di/adminContainer.ts`) – wire concrete implementations to interfaces
- **Validations** – request payload validation using [Zod](https://zod.dev/)
- **Middlewares** – authentication (JWT), role-based authorization, centralized error handling, Cloudinary upload config

This design makes it straightforward to swap implementations (e.g. change the database or an external service) without touching business logic.

## 🛠️ Tech Stack

### Backend (`/server`)
- [Express.js](https://expressjs.com/) (v5) — web framework
- [TypeScript](https://www.typescriptlang.org/) — type safety
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) — database & ODM
- [JWT](https://www.npmjs.com/package/jsonwebtoken) — access & refresh token authentication
- [bcrypt](https://www.npmjs.com/package/bcrypt) — password hashing
- [Zod](https://zod.dev/) — schema validation
- [Google Auth Library](https://www.npmjs.com/package/google-auth-library) — Google OAuth sign-in
- [Cloudinary](https://cloudinary.com/) + [Multer](https://www.npmjs.com/package/multer) (`multer-storage-cloudinary`) — profile image upload & storage
- [Nodemailer](https://www.npmjs.com/package/nodemailer) — sending OTP/verification emails
- [cookie-parser](https://www.npmjs.com/package/cookie-parser), [cors](https://www.npmjs.com/package/cors) — request handling

### Frontend (`/client`)
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — build tool & dev server
- [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) — accessible, composable UI components
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/) — state management
- [React Router](https://reactrouter.com/) — client-side routing
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) (`@hookform/resolvers`) — form handling & validation
- [Axios](https://axios-http.com/) — API requests
- [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google) — Google OAuth on the client
- [React Toastify](https://www.npmjs.com/package/react-toastify) — toast notifications
- [Lucide React](https://lucide.dev/) — icons

### Tooling
- [concurrently](https://www.npmjs.com/package/concurrently) — run client & server together in development
- ESLint — linting

## 📂 Project Structure

```
UserManagementApp/
├── client/                        # React frontend
│   ├── public/
│   └── src/
│       ├── api/                   # API call definitions (Axios)
│       ├── components/
│       │   ├── admin/             # Admin-specific components
│       │   ├── auth/              # Auth-related components
│       │   ├── lib/               # Shared client-side utilities
│       │   └── ui/                # shadcn/ui components
│       ├── hooks/                 # Custom React hooks
│       ├── pages/
│       │   ├── admin/             # Admin dashboard & login pages
│       │   └── user/              # Login, register, OTP, profile, reset password pages
│       ├── schemas/                # Zod schemas for form validation
│       ├── store/                  # Redux store & slices
│       └── types/                  # Shared TypeScript types
│
├── server/                        # Express backend
│   └── src/
│       ├── app.ts                 # App entry point
│       ├── config/                # DB connection, Google OAuth client config
│       ├── controllers/           # Route handlers (admin/user)
│       ├── di/                    # Dependency injection containers
│       ├── dtos/                  # Data Transfer Objects
│       ├── entities/              # Domain entities
│       ├── interfaces/
│       │   ├── repository-interfaces/
│       │   └── service-interfaces/
│       ├── middlewares/           # Auth, role, error handling, Cloudinary config, Zod validation
│       ├── models/                # Mongoose schemas (user, OTP)
│       ├── repositories/          # Data access layer (admin/user)
│       ├── routes/                # Express routers (admin/user)
│       ├── services/              # Business logic (admin/user)
│       ├── utils/                 # JWT helpers, OTP generation, email sending, error class
│       └── validations/           # Zod validation schemas
│
├── package.json                   # Root scripts (runs client & server concurrently)
└── tsconfig.base.json
```

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)
- A [Cloudinary](https://cloudinary.com/) account (for profile image uploads)
- A [Google Cloud OAuth Client ID](https://console.cloud.google.com/apis/credentials) (for Google sign-in)
- An email account/app password for sending OTP emails (e.g. Gmail)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Dinil-Denny/UserManagementApp.git
   cd UserManagementApp
   ```

2. Install dependencies for root, server, and client
   ```bash
   npm install
   npm install --prefix server
   npm install --prefix client
   ```

3. Create a `.env` file inside `server/` with the following variables:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGO_URI=your_mongodb_connection_string
   CLIENT_URL=http://localhost:5173

   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret

   AUTH_MAIL=your_email_address
   AUTH_PASS=your_email_app_password
   MAIL_HOST=your_smtp_host

   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret

   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   ```

4. Create a `.env` file inside `client/` with the following variables:
   ```env
   VITE_BACKEND_URL=http://localhost:3000
   VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
   ```

5. Run the app

   From the project root, start both client and server together:
   ```bash
   npm run dev
   ```

   Or run them separately:
   ```bash
   npm run server   # starts the Express backend
   npm run client   # starts the Vite dev server
   ```

6. Open the app in your browser at `http://localhost:5173` (Vite's default port).

## 🔐 Authentication Flow

- Passwords are hashed with `bcrypt` before being stored.
- On successful login, the server issues a short-lived **access token** and a longer-lived **refresh token**, delivered via HTTP-only cookies.
- `authMiddleware` verifies the access token (with silent refresh via `/auth-refresh`) on protected routes.
- `roleMiddleware` restricts specific routes to `"user"` or `"admin"` roles.
- New accounts must be verified via a one-time password (OTP) emailed to the user before they can log in.
- Google OAuth is supported as an alternative sign-in method via `/google-auth`.

## 👤 Author

**Dinil Denny**
GitHub: [@Dinil-Denny](https://github.com/Dinil-Denny)