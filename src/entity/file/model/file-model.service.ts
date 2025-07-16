import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FileApiService} from '../api';
import {IFileModel, IFileStackItem} from './file.model';

@Injectable({
  providedIn: 'root'
})
export class FileModelService {
  private fileApiService = inject(FileApiService);

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

  private popFromFileStack(): IFileStackItem | undefined {
    const fileStack = structuredClone(this.fileStack$.value);
    fileStack.pop();
    this.fileStack$.next(fileStack);
    return fileStack[fileStack.length - 1];
  }

  private pushToFileStack(dir: IFileModel | IFileStackItem) {
    const fileStack = structuredClone(this.fileStack$.value);
    fileStack.push({_id: dir._id, name: dir.name});
    this.fileStack$.next(fileStack);
  }
}
