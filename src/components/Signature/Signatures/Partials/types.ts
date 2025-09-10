export interface ISignaturesProps {
    writeSignature?: boolean;
    uploadSignature?: boolean;
    setFileData(files: File): void;
    text?: string;
}