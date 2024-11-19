import winston, { createLogger, format, transports } from 'winston';

import path from 'path';
import { AbstractConfigSetLevels } from 'winston/lib/winston/config';


interface LogLevels extends AbstractConfigSetLevels {
  info: number;
  warn: number;
  debug: number;
  error: number;
}

const LOG_LEVELS: LogLevels = {
  error: 0,
  info: 1,
  warn: 2,
  debug: 3,
}


class Logger {
  private logger: winston.Logger;
  constructor() {
    this.logger = createLogger({
      levels: LOG_LEVELS,
      level: process.env.LOG_LEVEL,
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        this.formatLog()
      ),
      transports: [
        new transports.File({ filename: path.join(__dirname, '../logs/combined.log'), level: process.env.LOG_LEVEL }),
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

  private formatLog(): winston.Logform.Format {
    return format.printf(({ timestamp, level, message, stack, ...meta }) => {
      
      if (stack) {
        return `${timestamp} [${level}]: ${message}\nStack: ${stack}`;
      }
      if (this.logger.level === 'debug') {
        return `${timestamp} [${level}]: ${message} - ${JSON.stringify(meta)}`;
      }
      return `${timestamp} [${level}]: ${message}`;
    });
  }

  getLogger() {
    return this.logger;
  }
}

export const logger = new Logger().getLogger();