import { Module } from '@nestjs/common';
import { ZipController } from './zip.controller';
import { ZipService } from './zip.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // для статики
    }),
  ],
  controllers: [ZipController],
  providers: [ZipService],
})
export class AppModule {} // Экспортируем AppModule
