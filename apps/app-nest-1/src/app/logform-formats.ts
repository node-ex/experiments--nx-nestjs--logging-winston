/**
 * Related documentation:
 *
 * https://github.com/winstonjs/winston#creating-custom-formats
 * https://github.com/winstonjs/logform/tree/master#info-objects
 * https://github.com/winstonjs/triple-beam
 */

import { format } from 'winston';
import { MESSAGE } from 'triple-beam';

const MESSAGE_SYMBOL = MESSAGE as symbol;

interface CustomPropertyOptions {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

export const customPropertyAdder = format((info, opts) => {
  const options = opts as CustomPropertyOptions;

  info[options.name] = options.value;

  return info;
});

export const customMessageFormatter = format((info) => {
  const rest = Object.assign({}, info, {
    level: undefined,
    message: undefined,
    splat: undefined,
  });

  const stringifiedRest = JSON.stringify(rest);
  const message = String(info.message);

  info[MESSAGE_SYMBOL] = `${info.level} -- ${message} -- ${stringifiedRest}`;

  return info;
});
