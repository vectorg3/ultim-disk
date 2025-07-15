import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HeaderComponent} from '../../../../shared';
import {Divider} from 'primeng/divider';
import {FileCreateBtnComponent, FileUploadComponent} from '../../../../features';
import {FilesBreadcrumbComponent, FilesTableComponent} from '../../../../entity/file';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';

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
  providers: [MessageService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

}
