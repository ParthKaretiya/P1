const REQUIRED = ['MONGO_URI', 'COMPANY_EMAIL', 'SMTP_USER', 'SMTP_PASS', 'FROM_EMAIL', 'CLIENT_URL'];

export const validateEnv = () => {
  const errors = [];
  for (const key of REQUIRED) {
    if (!process.env[key] || process.env[key].trim() === '') {
      errors.push(`${key} is required but missing or empty in env.`);
    }
  }

  if (process.env.SMTP_PORT) {
    const port = Number(process.env.SMTP_PORT);
    if (!Number.isFinite(port) || port <= 0 || port > 65535) {
      errors.push('SMTP_PORT must be a valid port number (1-65535).');
    }
  }

  if (process.env.PORT) {
    const port = Number(process.env.PORT);
    if (!Number.isFinite(port) || port <= 0 || port > 65535) {
      errors.push('PORT must be a valid port number (1-65535).');
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (process.env.COMPANY_EMAIL && !emailRegex.test(process.env.COMPANY_EMAIL.trim())) {
    errors.push('COMPANY_EMAIL is not a valid email address.');
  }
  if (process.env.FROM_EMAIL && !emailRegex.test(process.env.FROM_EMAIL.trim())) {
    errors.push('FROM_EMAIL is not a valid email address.');
  }
  if (process.env.CLIENT_URL && !/^https?:\/\//.test(process.env.CLIENT_URL.trim())) {
    errors.push('CLIENT_URL must start with http:// or https://.');
  }

  return errors;
};
