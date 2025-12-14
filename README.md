# Sweet Shop Management System

A full-stack sweet shop management application built with MongoDB, Express, React, and Node.js (MERN stack).

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

Make sure MongoDB is installed and running on your system:

\`\`\`bash
# Start MongoDB service
# On macOS with Homebrew:
brew services start mongodb-community

# On Linux:
sudo systemctl start mongod

# On Windows:
# MongoDB should start automatically as a service
\`\`\`

### 2. Install Dependencies

\`\`\`bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
\`\`\`

### 3. Configure Environment Variables

Create a `.env` file in the `backend` folder:

\`\`\`env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sweet-shop
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
\`\`\`

### 4. Run the Application

**Terminal 1 - Backend:**
\`\`\`bash
cd backend
npm run dev
\`\`\`

The backend will start on http://localhost:5000

**Terminal 2 - Frontend:**
\`\`\`bash
cd frontend
npm run dev
\`\`\`

The frontend will start on http://localhost:5173

### 5. Default Admin Account

For testing, you can create an admin account by registering and then manually updating the user in MongoDB:

\`\`\`bash
mongosh
use sweet-shop
db.users.updateOne(
  { email: "admin@sweetshop.com" },
  { $set: { role: "admin" } }
)
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

## Testing

\`\`\`bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
\`\`\`

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


