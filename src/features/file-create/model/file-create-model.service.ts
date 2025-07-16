import {inject, Injectable} from '@angular/core';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {FileCreateDialogComponent} from '@features/file-create/ui/file-create-dialog';
import {FileCreateApiService, FileCreateType, FileCreateTypeTitle, IFileCreateDto} from '@features/file-create';
import {FileModelService} from '@entity/file';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root',
  deps: [DialogService],
})
export class FileCreateModelService {
  private fileCreateApiService = inject(FileCreateApiService);
  private fileModelService = inject(FileModelService);
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
      if (this.fileModelService.currentDir$.value) reqBody.parent = this.fileModelService.currentDir$.value._id;
      this.fileCreateApiService.createDir(reqBody).subscribe({
        next: () => {
          this.fileModelService.loadFileList();
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
