import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FilesSearchComponent} from '@features/files-search';
import {UserMenuComponent} from '@entity/user';

@Component({
  selector: 'app-header',
  imports: [
    FilesSearchComponent,
    UserMenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

}
