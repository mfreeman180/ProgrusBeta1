# Social Media Web Application

A full-stack social media platform built with Next.js, Express, and PostgreSQL.

## Features

- User authentication (JWT-based)
- Profile management
- Post creation and management
- Likes and comments
- Real-time updates
- Responsive design with TailwindCSS

## Tech Stack

- Frontend: Next.js, TailwindCSS
- Backend: Node.js, Express
- Database: PostgreSQL
- ORM: Prisma
- Authentication: JWT

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/social-media-app.git
   cd social-media-app
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Update the variables with your configuration

4. Set up the database:
   ```bash
   cd backend
   npx prisma migrate dev
   ```

5. Start the development servers:
   ```bash
   # Start backend server (from backend directory)
   npm run dev

   # Start frontend server (from frontend directory)
   npm run dev
   ```

6. Visit `http://localhost:3000` to view the application

## Project Structure 