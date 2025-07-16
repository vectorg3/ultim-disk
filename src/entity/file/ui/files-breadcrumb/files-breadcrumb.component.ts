import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Breadcrumb} from 'primeng/breadcrumb';
import {map, Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MenuItem} from 'primeng/api';
import {Button} from 'primeng/button';
import {FileModelService} from '@entity/file';

@Component({
  selector: 'app-files-breadcrumb',
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
  private fileModelService = inject(FileModelService);

  public items$: Observable<MenuItem[]> = this.fileModelService.fileStack$.pipe(
    map((items) => (items.map((item) => ({label: item.name}))))
  )

  back = () => this.fileModelService.backToPrevDir();
}
