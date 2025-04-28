import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();
const app = express();
app.use(express.json()); // middleware to parse json
app.get('/', (req, res) => {
    res.send('Product Store API is running');
  });
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => {
    
    console.log(`Server is running on port ${PORT} hello`);
});

