import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Настраиваем папку для статических файлов
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Настраиваем папку для шаблонов и движок Handlebars
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // Указываем папку для шаблонов
  app.setViewEngine('hbs'); // Устанавливаем Handlebars в качестве движка шаблонов

  await app.listen(3000);
}
bootstrap();
