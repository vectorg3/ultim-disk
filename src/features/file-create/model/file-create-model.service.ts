import {inject, Injectable} from '@angular/core';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {FileManagerService} from '@entity/file/model';
import {TextInputDialogComponent} from '@shared/ui/text-input-dialog';
import {FileApiService} from '@entity/file/api';
import {IFileCreateDto} from '@entity/file/api/models';
import {NotificationService} from '@shared/lib/services';

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
  private fileApiService = inject(FileApiService);
  private fileManagerService = inject(FileManagerService);
  private notificationService = inject(NotificationService);
  private ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService) {}

  showDialog(type: FileCreateType) {
    this.ref = this.dialogService.open(TextInputDialogComponent, {
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
      this.fileApiService.createDir(reqBody).subscribe({
        next: () => {
          this.fileManagerService.loadFileList();
          this.notificationService.show('success', 'Success', 'Directory created')
        },
        error: (err) => {
          this.notificationService.show('error', 'Error', err.error.message)
        }
      })
    })
  }
}
