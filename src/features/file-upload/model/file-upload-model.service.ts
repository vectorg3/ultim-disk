import {inject, Injectable} from '@angular/core';
import {IUploadingFile} from '@features/file-upload';
import {BehaviorSubject, filter, first, switchMap, tap} from 'rxjs';
import {FileManagerService} from '@entity/file/model';
import {FileApiService} from '@entity/file/api';
import {NotificationService} from '@shared/lib/services';

@Injectable({
  providedIn: 'root'
})
export class FileUploadModelService {
  private fileApiService = inject(FileApiService);
  private fileManagerService = inject(FileManagerService);
  private notificationService = inject(NotificationService);

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
        if (dir) return this.fileApiService.uploadFileToServer(file, dir)
        else return this.fileApiService.uploadFileToServer(file);
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
        this.notificationService.show('success', 'Success', `File ${file.name} uploaded successfully`)
      },
      error: err => this.notificationService.show('error', 'Error', err.error.message)
    })
  }
}
