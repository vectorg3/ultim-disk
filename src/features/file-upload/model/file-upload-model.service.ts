import {inject, Injectable} from '@angular/core';
import {FileUploadApiService} from '@features/file-upload';
import {MessageService} from 'primeng/api';
import {FileModelService} from '@entity/file';
import {first, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadModelService {
  private fileUploadApiService = inject(FileUploadApiService);
  private fileModelService = inject(FileModelService);
  private messageService = inject(MessageService);

  uploadFile(file: File) {
    this.fileModelService.currentDir$.pipe(
      first(),
      switchMap((dir) => {
        if (dir) return this.fileUploadApiService.uploadFileToServer(file, dir)
        else return this.fileUploadApiService.uploadFileToServer(file);
      })
    ).subscribe({
      next: () => {
        this.fileModelService.loadFileList();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `File ${file.name} uploaded successfully`,
        })
      },
      error: err => this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: err.error.message,
      })
    })
  }
}
