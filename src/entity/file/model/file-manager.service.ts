import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FileApiService} from '@entity/file/api';
import {FileType, IFileModel, IFileStackItem} from '@entity/file/model/models';
import {NotificationService} from '@shared/lib/services';
import {saveAs} from 'file-saver';
import {IServerError} from '@shared/model';
import {getFilenameFromHeaders} from '@entity/file/api/utils';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {
  private fileApiService = inject(FileApiService);
  private notificationService = inject(NotificationService);

  fileList$ = new BehaviorSubject<IFileModel[]>([]);
  fileStack$ = new BehaviorSubject<IFileStackItem[]>([]);
  currentDir$ = new BehaviorSubject<IFileStackItem | null>(null);

  constructor() {
    this.loadFileList();
  }

  loadFileList() {
    if (this.currentDir$.value) this.fileApiService.getFilesList(this.currentDir$.value._id).subscribe((res) => this.fileList$.next(res))
    else this.fileApiService.getFilesList().subscribe((res) => this.fileList$.next(res))
  }

  popFromFileStack(): IFileStackItem | undefined {
    const fileStack = structuredClone(this.fileStack$.value);
    fileStack.pop();
    this.fileStack$.next(fileStack);
    return fileStack[fileStack.length - 1];
  }

  pushToFileStack(dir: IFileModel | IFileStackItem) {
    const fileStack = structuredClone(this.fileStack$.value);
    fileStack.push({_id: dir._id, name: dir.name});
    this.fileStack$.next(fileStack);
  }

  openDirectory(dir: IFileModel | IFileStackItem) {
    this.pushToFileStack(dir);
    this.currentDir$.next(dir);
    this.loadFileList();
  }

  backToPrevDir() {
    const prevDir = this.popFromFileStack();
    if (!prevDir) {
      this.currentDir$.next(null);
    } else this.currentDir$.next(prevDir);
    this.loadFileList();
  }

  deleteFileOrDir(item: IFileModel) {
    this.fileApiService.deleteFileOrDir(item._id).subscribe({
      next: () => {
        this.fileList$.next(this.fileList$.value.filter((f) => f._id !== item._id));
        this.notificationService.show('success', 'Success', `${item.type == FileType.dir ? 'Directory' : 'File'} was successfully deleted`);
      },
      error: (err) => {
        this.notificationService.show('error', 'Error', err.error.message);
      }
    });
  }

  downloadFile(item: IFileModel) {
    this.fileApiService.downloadFileFromServer(item._id).subscribe({
      next: (response) => {
        if (response.body) saveAs(response.body, getFilenameFromHeaders(response.headers));
      },
      error: (error: {error: IServerError}) => {
        this.notificationService.show('error', 'Error', error.error.message)
      }
    })
  }
}
