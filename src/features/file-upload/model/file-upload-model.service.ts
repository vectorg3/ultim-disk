import {inject, Injectable} from '@angular/core';
import {FileUploadApiService, IUploadingFile} from '@features/file-upload';
import {MessageService} from 'primeng/api';
import {BehaviorSubject, filter, first, switchMap, tap} from 'rxjs';
import {FileManagerService} from '@entity/file/model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadModelService {
  private fileUploadApiService = inject(FileUploadApiService);
  private fileManagerService = inject(FileManagerService);
  private messageService = inject(MessageService);

  readonly uploadedFiles$ = new BehaviorSubject<IUploadingFile[]>([]);

  uploadFile(file: File) {
    this.fileManagerService.currentDir$.pipe(
      first(),
      tap(() => {
        const uploadedFiles = structuredClone(this.uploadedFiles$.value);
        uploadedFiles.push({
          progress: 0,
          name: file.name,
          size: file.size,
          id: '',
        })
        this.uploadedFiles$.next(uploadedFiles);
      }),
      switchMap((dir) => {
        if (dir) return this.fileUploadApiService.uploadFileToServer(file, dir)
        else return this.fileUploadApiService.uploadFileToServer(file);
      }),
      tap((progress) => {
        if (typeof progress == 'number') {
          const uploadedFiles = structuredClone(this.uploadedFiles$.value);
          const uploadedFile = uploadedFiles.find((f) => f.name === file.name && f.size === file.size);
          if (uploadedFile) uploadedFile.progress = progress;
          this.uploadedFiles$.next(uploadedFiles);
        }
      }),
      filter((progress) => progress == 'Upload complete'),
    ).subscribe({
      next: (progress) => {
        this.fileManagerService.loadFileList();
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
