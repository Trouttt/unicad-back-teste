import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './modules/core/app.module';
import { Swagger } from './shared/infra/config/swagger/config';
import validationOptions from './shared/infra/config/validation-pipe/validate-pipe-options';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const config = new Swagger();

  config.configSwagger(
    'QUIKDEV back teste',
    'teste prático da QUIKDEV',
    '1.0',
    'QUIKDEV',
    app,
  );

  app.useGlobalPipes(new ValidationPipe(validationOptions));
  await app.listen(3000);
}
bootstrap();
