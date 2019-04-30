import * as sentry from '@sentry/browser';

import { ENV, SENTRY_KEY } from '../settings';

export class LogService {
  constructor(sentryKey: string) {
    sentry.init({
      dsn: sentryKey,
      environment: ENV,
    });
  }

  public handleError(err: any, force: boolean = false): void {
    if (!err) return;

    if (typeof err === 'string') {
      err = new Error(err);
    }

    if (err.ignoreLog || err.reported) return;
    err.reported = true;

    err.errorData = { extra: err.extraData };
    sentry.captureException(err);
  }

}

const logService = new LogService(SENTRY_KEY);
export default logService;