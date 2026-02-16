import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Breadcrumb} from 'primeng/breadcrumb';
import {map, Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MenuItem} from 'primeng/api';
import {Button} from 'primeng/button';
import {FilesTableModelService} from '@widgets/files-table/model';

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
  private filesTableModelService = inject(FilesTableModelService);

  public items$: Observable<MenuItem[]> = this.filesTableModelService.fileStack$.pipe(
    map((items) => (items.map((item) => ({label: item.name}))))
  )

  back = () => this.filesTableModelService.backToPrevDir();
}
