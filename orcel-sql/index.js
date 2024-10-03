// server.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js'; // Updated to import connectDB
import employeeRoutes from './routes/employes.routes.js'; // Fixed typo in routes import

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON requests

// Connect to the database
connectDB();

// Routes
app.use('/api/employees', employeeRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


