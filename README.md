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
