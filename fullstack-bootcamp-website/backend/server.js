import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import { validateEnv } from './utils/envValidation.js';

const ENV_ERRORS = validateEnv();
if (ENV_ERRORS.length) {
  console.error('[Env Validation] Missing or invalid environment variables:');
  for (const e of ENV_ERRORS) console.error(`  - ${e}`);
  console.error('[Env Validation] Fix the above and restart the server.');
  process.exit(1);
}

const normalizeOrigin = (url) => (url ? url.replace(/\/+$/, '') : url);

const app = express();

connectDB();

const allowedOrigins = new Set(
  [
    'https://www.nirayush.com',
    'https://nirayush.com',
    normalizeOrigin(process.env.CLIENT_URL),
    'http://localhost:5173',
    'http://localhost:3000',
  ]
    .map(normalizeOrigin)
    .filter(Boolean)
);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.has(normalizeOrigin(origin))) return callback(null, true);
      callback(new Error('CORS: Origin ' + origin + ' not allowed'));
    },
    credentials: true,
  })
);

app.set('trust proxy', 1);

const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});
app.use(globalLimiter);

app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: true, limit: '64kb' }));

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Nirayush Edutech API server is running smoothly.',
  });
});

app.use('/api/enquiry', enquiryRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API Route ' + req.originalUrl + ' not found.',
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(
    '[Nirayush Edutech Server] Running on port ' + PORT + ' in ' + (process.env.NODE_ENV || 'development') + ' mode.'
  );

  const keepAliveUrl = normalizeOrigin(
    process.env.RENDER_EXTERNAL_URL || process.env.BACKEND_URL || 'https://p1-p2rz.onrender.com'
  );
  if (keepAliveUrl) {
    setInterval(async () => {
      try {
        await fetch(`${keepAliveUrl}/`);
        console.log('[Keep-Alive Ping] Successfully pinged server to prevent sleeping.');
      } catch (e) {
        // Ignore background ping errors
      }
    }, 10 * 60 * 1000);
  }
});

process.on('unhandledRejection', (err) => {
  console.error('[Unhandled Rejection Error]: ' + err.message);
  server.close(() => process.exit(1));
});
