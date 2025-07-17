import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {FileUploadModelService} from '@features/file-upload';

@Component({
  selector: 'app-file-upload',
  imports: [
    Button
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent {
  private fileUploadModelService = inject(FileUploadModelService);

  onFileInputChange(event: any) {
    if (event.target.files && event.target.files[0]) this.fileUploadModelService.uploadFile(event.target.files[0])
  }
}
