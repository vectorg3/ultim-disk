import {inject, Injectable} from '@angular/core';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {FileCreateApiService, FileCreateDialogComponent, IFileCreateDto} from '@features/file-create';
import {MessageService} from 'primeng/api';
import {FileManagerService} from '@entity/file/model';

export enum FileCreateType {
  directory = 'dir',
  file = 'file'
}
export const FileCreateTypeTitle = new Map<FileCreateType, string>([
  [FileCreateType.directory, 'Type directory name'],
  [FileCreateType.file, 'Type file name'],
])
@Injectable({
  providedIn: 'root',
  deps: [DialogService],
})
export class FileCreateModelService {
  private fileCreateApiService = inject(FileCreateApiService);
  private fileManagerService = inject(FileManagerService);
  private messageService = inject(MessageService);
  private ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService) {}

  showDialog(type: FileCreateType) {
    this.ref = this.dialogService.open(FileCreateDialogComponent, {
      header: FileCreateTypeTitle.get(type),
      modal: true,
      contentStyle: { overflow: 'auto' },
      width: '400px',
      closable: true
    });

    this.ref.onClose.subscribe((name) => {
      if (!name) return;
      const reqBody: IFileCreateDto = {
        name,
        type: FileCreateType.directory,
      };
      if (this.fileManagerService.currentDir$.value) reqBody.parent = this.fileManagerService.currentDir$.value._id;
      this.fileCreateApiService.createDir(reqBody).subscribe({
        next: () => {
          this.fileManagerService.loadFileList();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Directory created',
          })
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
          })
        }
      })
    })
  }
}
