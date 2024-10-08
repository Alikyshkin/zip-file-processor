export declare class ZipService {
    private readonly ignoredPatterns;
    isIgnoredFile(filePath: string): boolean;
    removeComments(content: string, fileType: string): string;
    processZip(zipBuffer: Buffer): string;
}
