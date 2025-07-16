import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import {FileModelService, FileType} from '@entity/file';
import {TableModule} from 'primeng/table';
import {AsyncPipe, DatePipe} from '@angular/common';
import {Button} from 'primeng/button';
import {FileSizePipe} from '@entity/file/ui/files-table/file-size.pipe';

@Component({
  selector: 'app-files-table',
  imports: [
    TableModule,
    AsyncPipe,
    DatePipe,
    Button,
    FileSizePipe
  ],
  templateUrl: './files-table.component.html',
  styleUrl: './files-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilesTableComponent {
  private destroyRef = inject(DestroyRef);
  private fileModelService = inject(FileModelService);
  FileType = FileType;
  fileList$ = this.fileModelService.fileList$;

  openDirectory(id: string) {
    const file = structuredClone(this.fileList$.value).find((i) => i._id === id)!;
    this.fileModelService.openDirectory(file)
  }
}
