import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HeaderComponent} from '../../../../shared';

@Component({
  selector: 'app-dashboard',
  imports: [
    HeaderComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

}
