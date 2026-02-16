import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Avatar} from 'primeng/avatar';
import {filter, map} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {Menu} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';
import {USER_TOKEN} from '@entity/user/model/models';
import {TokenModelService} from '@entity/token/model';

@Component({
  selector: 'app-user-menu',
  imports: [
    Avatar,
    AsyncPipe,
    Menu
  ],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent {
  private readonly tokenModelService = inject(TokenModelService);
  private readonly router = inject(Router);

  user$ = inject(USER_TOKEN);

  userAvatar$ = this.user$.pipe(
    filter((user) => !!user),
    map((user) => String(user.name[0]).toUpperCase())
  )

  menuItems: MenuItem[] = [
    {
      icon: 'pi pi-comment',
      label: 'Support'
    },
    {
      icon: 'pi pi-cog',
      label: 'Settings'
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.logout()
    }
  ]

  private logout() {
    this.tokenModelService.clearTokens();
    this.user$.next(null);
    this.router.navigate(['auth/login']);
  }
}
