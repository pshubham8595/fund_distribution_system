export class DownloadFileModel{
    fileName:string="";
    filePath:string="";
    downloadUrl:string="";

    constructor(fileName: string, filePath: string, downloadUrl: string) {
        this.fileName = fileName;
        this.filePath = filePath;
        this.downloadUrl = downloadUrl;
    }
}