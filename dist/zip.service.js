"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZipService = void 0;
const common_1 = require("@nestjs/common");
const AdmZip = require("adm-zip");
let ZipService = class ZipService {
    constructor() {
        this.ignoredPatterns = [
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
    }
    isIgnoredFile(filePath) {
        return this.ignoredPatterns.some((pattern) => new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*')).test(filePath));
    }
    removeComments(content, fileType) {
        if (fileType === 'js' || fileType === 'ts' || fileType === 'css') {
            return content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim();
        }
        else if (fileType === 'json') {
            return content.replace(/\/\/.*/g, '').trim();
        }
        else if (fileType === 'py' || fileType === 'sh' || fileType === 'yaml') {
            return content.replace(/#.*/g, '').trim();
        }
        else {
            return content;
        }
    }
    processZip(zipBuffer) {
        const zip = new AdmZip(zipBuffer);
        const zipEntries = zip.getEntries();
        return zipEntries
            .filter((entry) => !entry.isDirectory && !this.isIgnoredFile(entry.entryName))
            .map((entry) => {
            const filePath = entry.entryName;
            const fileType = filePath.split('.').pop();
            let content = zip.readAsText(entry);
            content = this.removeComments(content, fileType);
            return `${filePath}\n\n${content}\n\n`;
        })
            .join('\n');
    }
};
exports.ZipService = ZipService;
exports.ZipService = ZipService = __decorate([
    (0, common_1.Injectable)()
], ZipService);
//# sourceMappingURL=zip.service.js.map