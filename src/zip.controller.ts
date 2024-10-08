import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  Get,
  Render,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ZipService } from './zip.service';
import { Response } from 'express';
import { memoryStorage } from 'multer';

@Controller()
export class ZipController {
  constructor(private readonly zipService: ZipService) {}

  @Get()
  @Render('index') // Рендерим шаблон "index.hbs"
  root() {
    return {};
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(), // Храним файлы в памяти
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const result = this.zipService.processZip(file.buffer);
    res.send(result); // Отправляем строку вместо JSON
  }
}
