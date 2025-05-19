import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class WinstonLoggingService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  public getLogsBasedOnJsonParameters(): string {
    const message = 'Hello, World!';
    const json = {
      message,
      additional: 'additional',
    };

    this.logger.log({
      level: 'info',
      ...json,
    });
    this.logger.error(json);
    this.logger.warn(json);
    this.logger.info(json);
    this.logger.http(json);
    this.logger.verbose(json);
    this.logger.debug(json);
    this.logger.silly(json);

    return message;
  }

  public getLogsBasedOnOrderedParameters(): string {
    const message = 'Hello, World!';
    const json = {
      additional: 'additional',
    };

    this.logger.log('info', message, json);
    this.logger.error(message, json);
    this.logger.warn(message, json);
    this.logger.info(message, json);
    this.logger.http(message, json);
    this.logger.verbose(message, json);
    this.logger.debug(message, json);
    this.logger.silly(message, json);

    return message;
  }

  /**
   * Does not work compared to the vanilla winston
   * https://github.com/winstonjs/winston/blob/master/examples/quick-start.js
   *
   * Perhaps requires format.splat() to work?
   */
  public getLogsBasedOnStringInterpolation(): string {
    const message = 'Hello, World!';

    this.logger.log('info', 'test message %s', 'my string');
    this.logger.log('info', 'test message %d', 123);
    this.logger.log('info', 'test message %s, %s', 'first', 'second', {
      number: 123,
    });
    this.logger.info('Found %s at %s', 'error', new Date());
    this.logger.info('Found %s at %s', 'error', new Error('chill winston'));
    this.logger.info('Found %s at %s', 'error', /WUT/);
    this.logger.info('Found %s at %s', 'error', true);
    this.logger.info('Found %s at %s', 'error', 100.0);
    this.logger.info('Found %s at %s', 'error', ['1, 2, 3']);

    return message;
  }

  public getLogsBasedOnErrorInstances(): string {
    const message = 'Hello, World!';

    /*
     * Showcases from:
     * https://github.com/winstonjs/winston/blob/master/examples/quick-start.js
     *
     * Don't work as documented in vanilla winston
     */
    this.logger.warn(new Error('Error passed as info'));
    this.logger.log('error', new Error('Error passed as message'));
    this.logger.warn(
      'Maybe important error: ',
      new Error('Error passed as meta'),
    );
    this.logger.log(
      'error',
      'Important error: ',
      new Error('Error passed as meta'),
    );

    /*
     * Showcases based on the nest-winston documentation:
     * https://github.com/gremo/nest-winston#logger-methods
     */
    this.logger.error(
      'Error happened:',
      new Error('Error message'),
      /* Does not work - not displayed */
      'Some context',
    );

    return message;
  }

  scheduleUnhandledErrorLog(): string {
    setTimeout(() => {
      throw new Error('Unhandled error');
    }, 500);

    return 'Unhandled error scheduled';
  }

  scheduleUnhandledRejectionLog(): string {
    void new Promise((resolve) => {
      setTimeout(resolve, 500);
    }).then(() => {
      throw new Error('Unhandled rejection');
    });

    return 'Unhandled rejection scheduled';
  }

  getLogsFromChildLogger(): string {
    const message = 'Hello, World!';

    const childLogger = this.logger.child({
      child: 'child',
    });

    childLogger.info(message);

    return message;
  }
}
