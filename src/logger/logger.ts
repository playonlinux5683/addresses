import winston, { createLogger, format, transports } from 'winston';

import path from 'path';

class Logger {
  private logger: winston.Logger;
  constructor() {
    this.logger = createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.printf(({ timestamp, level, message, stack }) =>
          stack
            ? `${timestamp} [${level}]: ${message}\nStack: ${stack}`
            : `${timestamp} [${level}]: ${message}`
        )
      ),
      transports: [
        new transports.File({ filename: path.join(__dirname, '../logs/combined.log'), level: 'info' }),
        new transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'error' })
      ],
    });

    // If we're not in production, log to the console as well
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new transports.Console({
        format: format.combine(
          format.colorize(),
        )
      }));
    }
  }

  getLogger() {
    return this.logger;
  }
}

export const logger = new Logger().getLogger();