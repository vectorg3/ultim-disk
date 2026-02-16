import {ChangeDetectionStrategy, Component} from '@angular/core';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-file-search',
  imports: [
    IconField,
    InputIcon,
    InputText
  ],
  templateUrl: './files-search.component.html',
  styleUrl: './files-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilesSearchComponent {

}
