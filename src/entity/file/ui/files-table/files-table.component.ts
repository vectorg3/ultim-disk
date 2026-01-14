import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FileModelService, FileType, IFileModel} from '@entity/file';
import {TableModule} from 'primeng/table';
import {AsyncPipe, DatePipe} from '@angular/common';
import {Button} from 'primeng/button';
import {FileSizePipe} from '@entity/file/ui/files-table/file-size.pipe';
import {ContextMenu} from 'primeng/contextmenu';
import {BehaviorSubject, map} from 'rxjs';

@Component({
  selector: 'app-files-table',
  imports: [
    TableModule,
    AsyncPipe,
    DatePipe,
    Button,
    FileSizePipe,
    ContextMenu
  ],
  templateUrl: './files-table.component.html',
  styleUrl: './files-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilesTableComponent {
  private readonly fileModelService = inject(FileModelService);
  protected readonly FileType = FileType;
  protected readonly fileList$ = this.fileModelService.fileList$;

  protected selectedFile$ = new BehaviorSubject<IFileModel | null>(null);

  protected readonly contextMenuItems$ = this.selectedFile$.pipe(
    map((file) => {
      return file ? [
        {
          label: 'Share', icon: 'pi pi-share-alt',
          command: () => {}
        },
        {
          separator: true
        },
        {
          label: 'Download', icon: 'pi pi-download',
          command: () => {},
        },
        {
          label: 'Rename', icon: 'pi pi-pen-to-square',
          command: () => {}
        },
        {
          label: 'Move', icon: 'pi pi-file-export',
          command: () => {}
        },
        {
          label: 'Copy', icon: 'pi pi-copy',
          command: () => {}
        },
        {
          separator: true
        },
        {
          label: 'Delete', icon: 'pi pi-trash',
          command: () => {}
        }
      ] : []
    })
  )

  openDirectory(id: string) {
    const file = structuredClone(this.fileList$.value).find((i) => i._id === id)!;
    if (file.type !== FileType.dir) return;
    this.fileModelService.openDirectory(file)
  }
}
