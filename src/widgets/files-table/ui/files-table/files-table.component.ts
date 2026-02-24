import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TableModule} from 'primeng/table';
import {AsyncPipe, DatePipe} from '@angular/common';
import {Button} from 'primeng/button';
import {FileSizePipe} from '@shared/model';
import {ContextMenu} from 'primeng/contextmenu';
import {BehaviorSubject, map} from 'rxjs';
import {FileManagerService, FileType, IFileModel} from '@entity/file/model';
import {FilesBreadcrumbComponent} from '@widgets/files-table/ui/files-breadcrumb';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

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
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './files-table.component.html',
  styleUrl: './files-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilesTableComponent {
  private fileManagerService = inject(FileManagerService);
  private confirmationService = inject(ConfirmationService);

  protected readonly FileType = FileType;
  protected readonly fileList$ = this.fileManagerService.fileList$;

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
          visible: this.selectedFile$.value?.type !== 'dir',
          label: 'Download', icon: 'pi pi-download',
          command: () => this.fileManagerService.downloadFile(this.selectedFile$.value!),
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
          command: () => this.confirmationService.confirm({
            message: 'Do you want to delete this file?',
            header: 'Confirm',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
              label: 'Cancel',
              severity: 'secondary',
              outlined: true
            },
            acceptButtonProps: {
              label: 'Delete',
              severity: 'danger'
            },
            accept: () => this.fileManagerService.deleteFileOrDir(this.selectedFile$.value!),
          })
        }
      ] : []
    })
  )

  openDirectory(id: string) {
    const file = structuredClone(this.fileList$.value).find((i) => i._id === id)!;
    if (file.type !== FileType.dir) return;
    this.fileManagerService.openDirectory(file)
  }
}
