import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Button} from 'primeng/button';

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

}
