import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { logger } from './logger';
import { searchRouter } from './search';

// Load environment variables from .env file
dotenv.config();
// Use environment variables for configuration
const PORT = process.env.PORT;

const app = express();


app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});

app.use('/autocomplete', searchRouter);
// Log errors
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).send('Internal Server Error');
});


// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});