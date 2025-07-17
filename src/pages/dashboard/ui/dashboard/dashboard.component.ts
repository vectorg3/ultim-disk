import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HeaderComponent} from '@shared/ui';
import {Divider} from 'primeng/divider';
import {FilesBreadcrumbComponent, FilesTableComponent} from '@entity/file';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {FileUploadComponent, FileUploadModelService} from '@features/file-upload';
import {FileCreateBtnComponent} from '@features/file-create';

@Component({
  selector: 'app-dashboard',
  imports: [
    HeaderComponent,
    Divider,
    FileUploadComponent,
    FileCreateBtnComponent,
    FilesTableComponent,
    FilesBreadcrumbComponent,
    Toast,
  ],
  providers: [MessageService, FileUploadModelService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

}
