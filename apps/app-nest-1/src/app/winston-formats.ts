import { format } from 'winston';
import * as customLogformFormat from './logform-formats';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

const commonFormatOptions = [
  /* Timestamp, by default in the new Date().toISOString() format */
  format.timestamp(),
  /* Time in milliseconds since the last log message */
  format.ms(),
];

export const simpleDevelopmentFormat = format.combine(
  ...commonFormatOptions,
  format.colorize({
    all: true,
  }),
  /*
   * Formattable level and message outside the single line JSON string
   * https://github.com/winstonjs/logform/blob/master/simple.js
   */
  format.simple(),
);

export const cliDevelopmentFormat = format.combine(
  ...commonFormatOptions,
  format.cli(),
);

export const jsonDevelopmentFormat = format.combine(
  ...commonFormatOptions,
  format.errors({ stack: true }),
  /*
   * JSON string pretty-printed on multiple lines with simple colors
   * https://github.com/winstonjs/logform/blob/master/pretty-print.js
   */
  format.prettyPrint({
    colorize: true,
  }),
);

export const jsonProductionFormat = format.combine(
  ...commonFormatOptions,
  /*
   * JSON string in a single line with all colors and formatting removed
   * https://github.com/winstonjs/logform/blob/master/json.js
   */
  format.json(),
);

export const customPrintfDevelopmentFormat = format.combine(
  ...commonFormatOptions,
  format.printf((info) => {
    const message = String(info.message);
    return `${info.level} ${message}`;
  }),
);

export const nestDevelopmentFormatFn = (appName: string) =>
  format.combine(
    ...commonFormatOptions,
    /*
     * Format similar to that of NestJS default logger
     * https://github.com/gremo/nest-winston/blob/main/src/winston.utilities.ts
     */
    nestWinstonModuleUtilities.format.nestLike(appName, {
      colors: true,
      prettyPrint: true,
      processId: true,
      appName: true,
    }),
  );

export const customFormat = format.combine(
  ...commonFormatOptions,
  customLogformFormat.customPropertyAdder({
    name: 'customProperty',
    value: 'customValue',
  }),
  customLogformFormat.customMessageFormatter(),
);
