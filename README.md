# Simple E-Commerce App (MERN Stack) 

A lightweight, 2-tier architecture e-commerce application built for beginners. This project uses a React frontend and a Node.js REST API backend connected to MongoDB.

## Project Overview
This application provides basic e-commerce functionality:
- **User Authentication**: Register and Login using session cookies.
- **Product Listing**: View available products from the database with INR pricing.
- **Shopping Cart**: Add products, adjust quantities, and remove items.
- **Checkout Flow**: Simple order placement simulating a checkout process.
- **Order History**: View past orders and their details.
- **Modern UI/UX**: Dark theme with glassmorphism, smooth animations, and responsive design.

## Tech Stack
### Frontend
- **ReactJS**: Built with Vite for fast scaffolding and hot module replacement.
- **Tailwind CSS**: Utility-first CSS framework for modern styling.
- **React Router**: For client-side navigation.
- **Axios**: Promised-based HTTP client for API requests.
- **Lucide React**: Beautiful, consistent icon set.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building the REST API.
- **MongoDB**: NoSQL database.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **Express Session**: For managing user authentication sessions.
- **Bcrypt.js**: For hashing passwords securely.

## Folder Structure
```text
e-commerce-app/
├── backend/                  # Node.js Express REST API
│   ├── config/               # Database connection setup
│   ├── controllers/          # Route handlers (Auth, Products, Cart, Orders)
│   ├── middleware/           # Custom middleware (Authentication check)
│   ├── models/               # Mongoose schemas (User, Product, Order)
│   ├── routes/               # Express route definitions
│   ├── seed.js               # Script to populate database with sample products
│   ├── seedAdmin.js          # Script to create admin user
│   ├── Dockerfile            # Docker configuration for backend
│   └── server.js             # Main backend application entry point
│
├── frontend/                 # React Vite Application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable UI components (Navbar)
│   │   ├── context/          # React Context (AuthContext, CartContext)
│   │   ├── pages/            # Page components (Login, Products, Cart, etc.)
│   │   ├── services/         # Axios API call logic (api.js, auth.js, etc.)
│   │   ├── App.jsx           # Main React component & Routing setup
│   │   ├── index.css         # Tailwind base styles
│   │   └── main.jsx          # React DOM rendering entry
│   ├── package.json          # Frontend dependencies
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   ├── vite.config.js        # Vite configuration
│   ├── Dockerfile            # Docker configuration for frontend
│   └── nginx.conf            # Nginx configuration for production
│
├── docker-compose.yml        # Docker Compose orchestration
├── .dockerignore             # Docker ignore file
└── README.md                 # This file
```

## Setup & Installation

### Prerequisites
1. **Node.js**: Make sure you have Node.js installed on your machine.
2. **MongoDB**: You must have a MongoDB instance running locally (e.g., MongoDB Community Server) or provide a MongoDB Atlas URI.

### 1. Database Setup
Ensure that the MongoDB service is running on your machine:
- Open the Windows **Services** app.
- Start the **MongoDB Server** service.

### 2. Environment Variables Setup
In the `backend` folder, create a file named `.env` and add the following configuration:
```env
# backend/.env
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce_db
SESSION_SECRET=my_super_secret_key
PORT=3000
```
*(If you do not create this file, the app will fallback to these default values).*

### 3. Install Dependencies
Open a terminal and install backend dependencies:
```bash
cd backend
npm install
```

Open another terminal and install frontend dependencies:
```bash
cd frontend
npm install
```

### 4. Seed Database (Optional but Recommended)
Populate your new database with sample products so the application isn't empty:
```bash
cd backend
node seed.js
```

Create an admin user for testing:
```bash
cd backend
node seedAdmin.js
```
**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

---

## How to Run

### Run the Backend API
In your terminal, navigate to the `backend` directory and start the server:
```bash
cd backend
npm start
```
*The API will run on http://localhost:3000*

### Run the Frontend Client
In a new terminal window, navigate to the `frontend` directory and start Vite:
```bash
cd frontend
npm run dev
```
*The React app will run on http://localhost:5174 (or 5173).*

Open your browser and navigate to the link provided by Vite (e.g., `http://localhost:5174`) to use the application!

### View Data in MongoDB (Terminal)
If you want to view the users, products, or orders directly in your database without installing a GUI like MongoDB Compass, you can use the MongoDB Shell (`mongosh`):

1. Open your terminal.
2. Run the following command to view all registered users:
   ```bash
   mongosh "mongodb://127.0.0.1:27017/ecommerce_db" --eval "db.users.find().toArray()"
   ```
3. To explore interactively, simply type `mongosh` in your terminal, then type `use ecommerce_db`, and run queries like `db.products.find()`.

---

## Docker Deployment

For containerized deployment using Docker and Docker Compose:

### Prerequisites
- Docker installed on your machine
- Docker Compose installed

### Build and Run with Docker Compose
```bash
docker-compose up --build
```

This will:
- Start MongoDB on port 27017
- Start the backend API on port 3000
- Start the frontend on port 80

### Seed Database in Docker
```bash
docker-compose exec backend node seed.js
docker-compose exec backend node seedAdmin.js
```

### Stop Containers
```bash
docker-compose down
```

---

## Future Improvements
As a beginner-friendly project, there are many ways this application can be enhanced for production:
1. **JWT Authentication**: Replace session cookies with JSON Web Tokens (JWT) for a more scalable stateless backend.
2. **Payment Integration**: Integrate Stripe or PayPal API for real checkout processing.
3. **State Management**: Implement Redux or Zustand for more complex global state management instead of React Context.
4. **Admin Dashboard**: Add roles so an Admin user can add, edit, or delete products and manage all orders.
5. **Image Uploads**: Integrate Multer and Cloudinary to allow users to upload real product images instead of URLs.
6. **Form Validation**: Add strict input validation using libraries like Zod or Yup on both frontend and backend.
