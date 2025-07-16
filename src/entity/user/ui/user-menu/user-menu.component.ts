import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Avatar} from 'primeng/avatar';
import {UserModelService} from '@entity/user';
import {filter, map} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {Menu} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {TokenModelService} from '@shared/model';
import {Router} from '@angular/router';

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
  private readonly userModelService = inject(UserModelService);
  private readonly tokenModelService = inject(TokenModelService);
  private readonly router = inject(Router);

  user$ = this.userModelService.currentUser$
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
