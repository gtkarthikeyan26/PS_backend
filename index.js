import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'; // Import cors package
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();
const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:5173', // Your local frontend
    'https://thesupplyshop.vercel.app' // Your production frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Enable if using cookies/auth
};

app.use(cors(corsOptions)); // Enable CORS
app.use(express.json()); // middleware to parse json

// Test route
app.get('/', (req, res) => {
  res.send('Product Store API is running');
});

// Product routes
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});