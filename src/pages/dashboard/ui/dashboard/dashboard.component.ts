import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Divider} from 'primeng/divider';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {FileUploadComponent, FileUploadModelService} from '@features/file-upload';
import {FileCreateBtnComponent} from '@features/file-create';
import {FilesTableComponent} from '@widgets/files-table';
import {HeaderComponent} from '@pages/dashboard/ui/header';

@Component({
  selector: 'app-dashboard',
  imports: [
    HeaderComponent,
    Divider,
    FileUploadComponent,
    FileCreateBtnComponent,
    Toast,
    FilesTableComponent,
  ],
  providers: [MessageService, FileUploadModelService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

}
