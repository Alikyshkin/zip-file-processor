import { ZipService } from './zip.service';
import { Response } from 'express';
export declare class ZipController {
    private readonly zipService;
    constructor(zipService: ZipService);
    root(): {};
    uploadFile(file: Express.Multer.File, res: Response): Promise<void>;
}
