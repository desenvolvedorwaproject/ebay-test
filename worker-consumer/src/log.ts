import * as sentry from '@sentry/node';
import { BUILD_DATE, BUILD_NUMBER, NODE_ENV, SENTRY_DSN } from 'settings';

sentry.init({
  dsn: SENTRY_DSN,
  environment: NODE_ENV,
  release: BUILD_NUMBER,
  tags: {
    environment: NODE_ENV,
    version: BUILD_NUMBER,
    versionDate: BUILD_DATE
  }
});

export function logException(err: any): void {
  console.error(err);
  sentry.captureException(err);
}