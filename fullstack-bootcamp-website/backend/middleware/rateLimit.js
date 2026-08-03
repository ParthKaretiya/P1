import rateLimit from 'express-rate-limit';

export const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 6,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    const ip = (req.headers['x-forwarded-for'] || req.ip || req.socket?.remoteAddress || 'unknown').toString();
    const firstIp = ip.split(',')[0]?.trim() || ip;
    return `enquiry:${firstIp}`;
  },
  message: {
    success: false,
    message: 'Too many enquiry submissions from this IP. Please try again later.',
  },
});

export const debugLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many debug requests. Please try again later.',
  },
});
