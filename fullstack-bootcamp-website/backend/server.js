/**
 * Nirayush Edutech - Backend Server Entrypoint
 * Technology Stack: Node.js, Express.js, MongoDB Atlas (Mongoose), Nodemailer
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import errorHandler from './middleware/errorHandler.js';

// Initialize Express Application
const app = express();

// Connect to MongoDB Atlas
connectDB();

const allowedOrigins = [
  'https://www.nirayush.com',
  'https://nirayush.com',
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: Origin ${origin} not allowed`));
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Health Check Endpoint (For monitoring & Render deployment status)
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Nirayush Edutech API server is running smoothly.',
  });
});

// 3. API Routes
app.use('/api/enquiry', enquiryRoutes);

// 4. 404 Route Handler (Catch-all for undefined endpoints)
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found.`,
  });
});

// 5. Global Error Handling Middleware
app.use(errorHandler);

// 6. Start Express Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`[Nirayush Edutech Server] Running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
});

// Handle unhandled promise rejections gracefully
process.on('unhandledRejection', (err) => {
  console.error(`[Unhandled Rejection Error]: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
