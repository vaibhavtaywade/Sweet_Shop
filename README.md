# Sweet Shop Management System

A full-stack sweet shop management application built with MongoDB, Express, React, and Node.js (MERN stack).
Deployed: https://genuine-nasturtium-04ef11.netlify.app/

## Features

- User authentication with JWT tokens
- Browse and search sweets by name, category, or price range
- Purchase sweets (decreases inventory)
- Admin functionality to add, update, delete, and restock sweets
- Responsive modern UI with React

## Tech Stack

**Backend:**
- Node.js & Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing

**Frontend:**
- React with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Axios for API calls

## Prerequisites

- Node.js (v18 or higher)
- MongoDB installed and running locally
- npm or yarn

## Getting Started

### 1. Setup MongoDB

### 2. Install Dependencies

### Install backend dependencies
cd backend
npm install

### Install frontend dependencies
cd frontend
npm install

### 3. Configure Environment Variables

### 4. Run the Application

**Terminal 1 - Backend:**
\`\`\`
npm run dev
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`
npm run dev
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Sweets (Protected)
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search?name=chocolate&category=candy&minPrice=1&maxPrice=10` - Search sweets
- `POST /api/sweets` - Add new sweet (Admin only)
- `PUT /api/sweets/:id` - Update sweet (Admin only)
- `DELETE /api/sweets/:id` - Delete sweet (Admin only)

### Inventory (Protected)
- `POST /api/sweets/:id/purchase` - Purchase a sweet
- `POST /api/sweets/:id/restock` - Restock a sweet (Admin only)

## Project Structure

\`\`\`
sweet-shop/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── types/
│   │   └── server.ts
│   ├── tests/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── services/
│   │   ├── types/
│   │   └── App.tsx
│   └── package.json
└── README.md
\`\`\`

## My AI Usage

**AI Tools Used:** 

**How I Used Them:**
- Used v0 to generate the complete project structure of frontend with React and TypeScript
- Generated the ui and for integration


**Reflection:**
Using AI significantly accelerated the development process, especially for:
- Setting up the initial project structure with best practices
- Creating reusable React components with TypeScript
- Writing comprehensive test cases covering edge cases
- Establishing consistent code patterns across the application


