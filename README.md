# AI Content Studio

AI-powered content generation platform built with the MERN stack for creating and managing content for different social and professional platforms.

## Overview

AI Content Studio is a full-stack web application that allows users to generate AI-assisted content from a simple prompt. Users can choose from Blog, Instagram, LinkedIn, and Tweet templates, view and manage their generation history, and access individual generated content. The project was built to practice and demonstrate practical MERN stack development, REST API integration, authentication, database operations, state management, and third-party AI API integration.

## Features

- User registration and login
- JWT-based authentication using HTTP-only cookies
- Automatic session restoration for logged-in users
- Protected frontend routes and authenticated backend APIs
- AI content generation using Blog, Instagram, LinkedIn, and Tweet templates
- Groq AI integration for content generation
- Generation history stored in MongoDB
- Paginated generation history
- Filter generation history by content template
- View individual generated content
- Delete individual generation history entries
- Daily generation usage tracking
- AI token usage tracking
- Free and Pro plan management
- Demo Pro plan upgrade and activation flow
- Automatic Pro plan expiration handling
- Form validation and user feedback using React Hook Form and toast notifications
- Responsive user interface

## Tech Stack

### Frontend

- React
- JavaScript
- Vite
- React Router
- Redux Toolkit
- React Redux
- Axios
- Tailwind CSS
- React Hook Form
- React Markdown
- Remark GFM
- React Icons
- Lucide React
- React Hot Toast

### Backend

- Node.js
- Express.js
- JavaScript (ES Modules)
- JWT
- bcrypt
- Cookie Parser
- CORS
- dotenv

### Database

- MongoDB
- Mongoose

### AI Integration

- Groq API

## Application Flow

```text
                    ┌─────────────────────┐
                    │    React Frontend   │
                    │                     │
                    │  React + Redux      │
                    │  React Router       │
                    └──────────┬──────────┘
                               │
                         Axios / REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Node.js + Express   │
                    │                     │
                    │ Routes              │
                    │ Controllers         │
                    │ Services            │
                    │ Auth Middleware     │
                    └───────┬───────┬─────┘
                            │       │
                  ┌─────────┘       └──────────┐
                  ▼                            ▼
          ┌───────────────┐            ┌───────────────┐
          │    MongoDB    │            │   Groq API    │
          │               │            │               │
          │ Users         │            │ AI Content    │
          │ Generations   │            │ Generation    │
          └───────────────┘            └───────────────┘
```

### Authentication Flow

- A user registers or logs in through the React frontend.
- The backend validates the credentials and generates a JWT.
- The JWT is stored in an HTTP-only cookie.
- Protected API requests send the cookie automatically.
- The authentication middleware verifies the JWT and attaches the user's ID to the request.
- User-specific operations such as generation history and deletion are performed using the authenticated user ID.

### Content Generation Flow

- The user enters a prompt and selects a content template.
- React dispatches the generation Redux thunk.
- Axios sends the request to the Express API.
- The backend checks the authenticated user and usage limits.
- The selected template is used to build an AI prompt.
- The backend sends the prompt to the Groq API.
- The generated content and token usage are stored in MongoDB.
- The generated result is returned to the frontend and displayed to the user.

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB database
- Groq API key

### Installation

#### Clone the repository:

```
git clone <https://github.com/MsManish09/ai-content-studio.git>
cd ai-content-studio
```

### Install frontend dependencies:

```
cd frontend
npm install
```

### Install backend dependencies:

```
cd ../backend
npm install
```

### Environment Variables

Create a .env file inside the backend directory.

```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
PORT=8080
```

### Run the Application

#### Start the backend:

```
cd backend
npm run dev
```

- The backend runs on port 8080 by default.

#### Start the frontend in a separate terminal:

```
cd frontend
npm run dev
```

- The frontend development server runs using Vite.

#### The frontend currently communicates with the backend through:

```
http://localhost:8080/api
```

### API Overview

The backend exposes REST APIs under /api.

#### Authentication

| Method | Endpoint             | Description                              | Authentication |
| ------ | -------------------- | ---------------------------------------- | -------------- |
| `POST` | `/api/auth/register` | Register a new user                      | No             |
| `POST` | `/api/auth/login`    | Authenticate a user                      | No             |
| `POST` | `/api/auth/logout`   | Log out the current user                 | No             |
| `GET`  | `/api/auth/me`       | Get the currently authenticated user     | Yes            |
| `PUT`  | `/api/auth/upgrade`  | Upgrade the current user to the Pro plan | Yes            |
