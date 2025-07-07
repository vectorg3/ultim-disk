import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FilesSearchComponent} from '../../../features';
import {UserMenuComponent} from '../../../entity/user/ui/user-menu/user-menu.component';

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
