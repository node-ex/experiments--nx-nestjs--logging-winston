import { Controller, Get } from '@nestjs/common';
import { WinstonLoggingService } from './winston-logging.service';

@Controller('logging')
export class WinstonLoggingController {
  constructor(private readonly loggingService: WinstonLoggingService) {}

  @Get('json-parameters')
  getLogsBasedOnJsonParameters(): string {
    return this.loggingService.getLogsBasedOnJsonParameters();
  }

  @Get('string-interpolation')
  getLogsBasedOnStringInterpolation(): string {
    return this.loggingService.getLogsBasedOnStringInterpolation();
  }

  @Get('ordered-parameters')
  getLogsBasedOnOrderedParameters(): string {
    return this.loggingService.getLogsBasedOnOrderedParameters();
  }

  @Get('error-instances')
  getLogsBasedOnErrorInstances(): string {
    return this.loggingService.getLogsBasedOnErrorInstances();
  }

  @Get('unhandled-error')
  scheduleUnhandledErrorLog(): string {
    return this.loggingService.scheduleUnhandledErrorLog();
  }

  @Get('unhandled-rejection')
  scheduleUnhandledRejectionLog(): string {
    return this.loggingService.scheduleUnhandledRejectionLog();
  }

  @Get('child-logger')
  getLogsFromChildLogger(): string {
    return this.loggingService.getLogsFromChildLogger();
  }
}
