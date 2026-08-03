/**
 * API Response Utility Helper
 * Ensures consistent JSON response structures across all controller endpoints.
 */

/**
 * Sends a successful JSON response.
 * @param {Object} res - Express response object
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code (Default: 200/201)
 */
export const sendSuccessResponse = (res, message = 'Operation successful.', statusCode = 200, data) => {
  const payload = {
    success: true,
    message,
  };
  if (data !== undefined) payload.data = data;
  return res.status(statusCode).json(payload);
};

/**
 * Sends an error JSON response.
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code (Default: 400/500)
 */
export const sendErrorResponse = (res, message = 'Something went wrong.', statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
