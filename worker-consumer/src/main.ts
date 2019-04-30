import 'app-module-path/register';
import 'source-map-support';

import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ExceptionFilter } from 'filters/exception';
import { ApplicationModule } from 'modules';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice(ApplicationModule, {
    options: { port: 9001 }
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionFilter(httpAdapter));

  await app.listenAsync();

  process.on('SIGTERM', async () => {
    await app.close();
    process.exit(0);
  });
}

bootstrap();
