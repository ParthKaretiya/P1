/**
 * Global Error Handling Middleware
 * Intercepts unhandled synchronous & asynchronous errors and formats a uniform error response.
 */

import { sendErrorResponse } from '../utils/responseHandler.js';

/**
 * Express Global Error Handler
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[Global Error Handler]: ${err.stack || err.message}`);

  // Handle Mongoose Validation Errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return sendErrorResponse(res, messages.join(', '), 400);
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    return sendErrorResponse(res, 'Duplicate field value entered.', 400);
  }

  // Handle Mongoose Cast Error (Invalid ID)
  if (err.name === 'CastError') {
    return sendErrorResponse(res, 'Resource not found.', 404);
  }

  // Default fallback response format required by prompt specifications
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  const customMessage = process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong.';

  return sendErrorResponse(res, customMessage || 'Something went wrong.', statusCode);
};

export default errorHandler;
