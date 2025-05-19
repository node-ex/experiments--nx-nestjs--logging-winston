import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { WinstonLoggingController } from './winston-logging.controller';
import { WinstonLoggingService } from './winston-logging.service';
import {
  simpleDevelopmentFormat,
  jsonDevelopmentFormat,
  jsonProductionFormat,
  cliDevelopmentFormat,
  customPrintfDevelopmentFormat,
  nestDevelopmentFormatFn,
  customFormat,
} from './winston-formats';

@Module({
  imports: [
    ConfigModule.forRoot({
      // No need to import in other modules
      isGlobal: true,
      expandVariables: true,
      // cache: true,
    }),
    /*
     * NestJS package allows to define only a single logger,
     * there is no support for multiple loggers, like in the vanilla winston:
     * https://github.com/winstonjs/winston#working-with-multiple-loggers-in-winston
     *
     * More info:
     * https://github.com/gremo/nest-winston/issues/214
     */
    WinstonModule.forRoot({
      /* Logging levels: https://github.com/winstonjs/winston#logging-levels */
      level: 'debug', // Default: 'info'
      levels: winston.config.npm.levels, // Default: winston.config.npm.levels
      /*
       * Formats:
       * https://github.com/winstonjs/winston#formats
       * https://github.com/winstonjs/logform
       */
      // Default: winston.format.json()
      format: customFormat,
      /* Transports: https://github.com/winstonjs/winston#transports */
      transports: [
        new winston.transports.Console({
          handleExceptions: true,
          handleRejections: true,
        }),
      ],
      /* Exception handlers: https://github.com/winstonjs/winston#handling-uncaught-exceptions-with-winston */
      exceptionHandlers: [
        // new winston.transports.Console()
      ],
      /* Rejection handlers: https://github.com/winstonjs/winston#handling-uncaught-promise-rejections-with-winston */
      rejectionHandlers: [
        // new winston.transports.Console()
      ],
      /* Exit on error: https://github.com/winstonjs/winston#to-exit-or-not-to-exit */
      exitOnError: true, // Default: true
    }),
  ],
  controllers: [AppController, WinstonLoggingController],
  providers: [AppService, WinstonLoggingService],
})
export class AppModule {}
