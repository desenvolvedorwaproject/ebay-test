import { logException } from 'log';

export const NODE_ENV = (process.env.NODE_ENV || 'production').trim();
export const SENTRY_DSN = (process.env.SENTRY_DSN || '').trim();

export const MONGO_DSN = (process.env.MONGO_DSN || 'mongodb://localhost:27017/ebay').trim();
export const RABBIT_DSN = (process.env.RABBIT_DSN || 'amqp://guest:guest@localhost:5672').trim();
export const RABBIT_QUEUE = (process.env.RABBIT_QUEUE || 'emails').trim();

export const BUILD_NUMBER = (process.env.BUILD_NUMBER || '').trim();
export const BUILD_DATE = (process.env.BUILD_DATE || '').trim();

export const IS_DEV = NODE_ENV === 'development';
export const IS_PROD = NODE_ENV !== 'development';
export const IS_TEST = NODE_ENV === 'test';

export const INTERVALS = (process.env.INTERVALS || '2,15,30').trim().split(',').map(v => Number(v));

if (INTERVALS.some(v => !v)) {
  const error = new Error(`INVALID INTERVALS CONFIG: ${INTERVALS.join(',')}`);
  logException(error);

  throw error;
}