import { Injectable } from '@nestjs/common';
import * as AdmZip from 'adm-zip';

@Injectable()
export class ZipService {
  private readonly ignoredPatterns = [
    '**/node_modules/**',
    '**/*.lock',
    '**/*.lockb',
    '**/public/**',
    '**/dist/**',
    '**/build/**',
    '**/.cache/**',
    '**/*.eslintcache',
    '**/.git/**',
    '**/*.gitignore',
    '**/.nuxt/**',
  ];

  isIgnoredFile(filePath: string): boolean {
    return this.ignoredPatterns.some((pattern) =>
      new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*')).test(
        filePath,
      ),
    );
  }

  // Метод для удаления комментариев
  removeComments(content: string, fileType: string): string {
    if (fileType === 'js' || fileType === 'ts' || fileType === 'css') {
      // Удаляем однострочные и многострочные комментарии для JS/TS/CSS
      return content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim();
    } else if (fileType === 'json') {
      // Удаляем однострочные комментарии для JSON
      return content.replace(/\/\/.*/g, '').trim();
    } else if (fileType === 'py' || fileType === 'sh' || fileType === 'yaml') {
      // Удаляем комментарии для Python, Shell, YAML
      return content.replace(/#.*/g, '').trim();
    } else {
      // Если формат файла неизвестен, не удаляем комментарии
      return content;
    }
  }

  processZip(zipBuffer: Buffer): string {
    const zip = new AdmZip(zipBuffer);
    const zipEntries = zip.getEntries();

    return zipEntries
      .filter(
        (entry) => !entry.isDirectory && !this.isIgnoredFile(entry.entryName),
      ) // Игнорируем ненужные файлы
      .map((entry) => {
        const filePath = entry.entryName; // Путь к файлу
        const fileType = filePath.split('.').pop(); // Определяем тип файла по расширению
        let content = zip.readAsText(entry); // Содержимое файла

        // Удаляем комментарии
        content = this.removeComments(content, fileType);

        return `${filePath}\n\n${content}\n\n`; // Возвращаем путь и контент без комментариев
      })
      .join('\n'); // Соединяем все файлы в одну строку
  }
}
