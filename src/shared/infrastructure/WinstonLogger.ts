import Logger from '../domain/Logger';
import winston, { Logger as WinstonLoggerType } from 'winston';
import MorganLogger from "./MorganLogger";


enum Levels {
  DEBUG = 'debug',
  ERROR = 'error',
  INFO = 'info'
}

class WinstonLogger implements Logger {
  private logger: WinstonLoggerType;

  constructor() {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `logs/${Levels.DEBUG}.log`, level: Levels.DEBUG }),
        new winston.transports.File({ filename: `logs/${Levels.ERROR}.log`, level: Levels.ERROR }),
        new winston.transports.File({ filename: `logs/${Levels.INFO}.log`, level: Levels.INFO })
      ]
    });
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  info(message: string) {
    this.logger.info(message);
  }

  static morganMiddleware(): any {
    const logger : Logger = new WinstonLogger();
    return MorganLogger.morganMiddleware(logger);
  }

}

export default WinstonLogger;
