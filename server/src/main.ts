import 'app-module-path/register';
import 'source-map-support';

import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionFilter } from 'filters/exception';
import { ApplicationModule } from 'modules';
import { IS_PROD } from 'settings';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ApplicationModule);

  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: IS_PROD, forbidUnknownValues: true }));
  app.enableCors();

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionFilter(httpAdapter));

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Ebay Email Search API')
    .setDescription('WaProject Ebay Email')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(3001);

  process.on('SIGTERM', async () => {
    await app.close();
    process.exit(0);
  });
}

bootstrap();
