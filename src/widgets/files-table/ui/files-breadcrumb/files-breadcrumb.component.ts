import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Breadcrumb} from 'primeng/breadcrumb';
import {map, Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MenuItem} from 'primeng/api';
import {Button} from 'primeng/button';
import {FileManagerService} from '@entity/file/model';

@Component({
  selector: 'app-file-breadcrumb',
  imports: [
    Breadcrumb,
    AsyncPipe,
    Button
  ],
  templateUrl: './files-breadcrumb.component.html',
  styleUrl: './files-breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilesBreadcrumbComponent {
  private fileManagerService = inject(FileManagerService);

  public items$: Observable<MenuItem[]> = this.fileManagerService.fileStack$.pipe(
    map((items) => (items.map((item) => ({label: item.name}))))
  )

  back = () => this.fileManagerService.backToPrevDir();
}
