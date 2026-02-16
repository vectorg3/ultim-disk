import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TableModule} from 'primeng/table';
import {AsyncPipe, DatePipe} from '@angular/common';
import {Button} from 'primeng/button';
import {FileSizePipe} from '@shared/model';
import {ContextMenu} from 'primeng/contextmenu';
import {BehaviorSubject, map} from 'rxjs';
import {FilesTableModelService} from '../../model';
import {FileType, IFileModel} from '@entity/file/model';
import {FilesBreadcrumbComponent} from '@widgets/files-table/ui/files-breadcrumb';

@Component({
  selector: 'app-file-table',
  imports: [
    TableModule,
    AsyncPipe,
    DatePipe,
    Button,
    FileSizePipe,
    ContextMenu,
    FilesBreadcrumbComponent,
  ],
  templateUrl: './files-table.component.html',
  styleUrl: './files-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilesTableComponent {
  private readonly fileModelService = inject(FilesTableModelService);
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
