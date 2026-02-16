import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Card} from 'primeng/card';
import {InputIcon} from 'primeng/inputicon';
import {IconField} from 'primeng/iconfield';
import {AutoFocus} from 'primeng/autofocus';
import {InputText} from 'primeng/inputtext';
import {IRegisterDto} from '@pages/auth';
import {FormsModule} from '@angular/forms';
import {FocusTrap} from 'primeng/focustrap';
import {Button} from 'primeng/button';
import {Password} from 'primeng/password';
import {Message} from 'primeng/message';
import {Router, RouterLink} from '@angular/router';
import {IServerError} from '@shared/model';
import {AuthApiService} from '@pages/auth/api';
import {TokenModelService} from '@entity/token/model';
import {NotificationService} from '@shared/lib/services';

@Component({
  selector: 'app-register-page',
  imports: [
    Card,
    InputIcon,
    IconField,
    AutoFocus,
    InputText,
    FormsModule,
    FocusTrap,
    Button,
    Password,
    Message,
    RouterLink
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent {
  private readonly authService = inject(AuthApiService);
  private readonly tokenModelService = inject(TokenModelService);
  private readonly notificationService = inject(NotificationService)
  private readonly router = inject(Router);

  public loading: boolean = false;

  public data: IRegisterDto = {
    name: '',
    email: '',
    password: '',
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.loading = true;
      this.authService.signup(this.data).subscribe({
        next: data => {
          this.tokenModelService.setTokens(data);
          this.router.navigate(['/dashboard']);
        },
        error: (error: {error: IServerError}) => {
          this.notificationService.show('error', 'Error', error.error.message)
          this.loading = false;
        }
      })
    }
  }
}
