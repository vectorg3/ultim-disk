import {inject, Injectable} from '@angular/core';
import {FileManagerService, IFileModel, IFileStackItem} from '@entity/file/model';

@Injectable({
  providedIn: 'root'
})
export class FilesTableModelService {
  private fileManagerService = inject(FileManagerService);

  fileList$ = this.fileManagerService.fileList$;
  fileStack$ = this.fileManagerService.fileStack$;
  currentDir$ = this.fileManagerService.currentDir$;

  constructor() {
    this.fileManagerService.loadFileList();
  }

  openDirectory(dir: IFileModel | IFileStackItem) {
    this.fileManagerService.pushToFileStack(dir);
    this.currentDir$.next(dir);
    this.fileManagerService.loadFileList();
  }

  backToPrevDir() {
    const prevDir = this.fileManagerService.popFromFileStack();
    if (!prevDir) {
      this.currentDir$.next(null);
    } else this.currentDir$.next(prevDir);
    this.fileManagerService.loadFileList();
  }
}
