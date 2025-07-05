import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {FocusTrap} from 'primeng/focustrap';
import {FormsModule} from '@angular/forms';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {Message} from 'primeng/message';
import {Password} from 'primeng/password';
import {ILoginDto} from '../../model';
import {RouterLink} from '@angular/router';
import {AutoFocus} from 'primeng/autofocus';
import {AuthApiService} from '../../api';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';
import {IServerError, TokenModelService} from '../../../../shared';

@Component({
  selector: 'app-login-page',
  imports: [
    Button,
    Card,
    FocusTrap,
    FormsModule,
    IconField,
    InputIcon,
    InputText,
    Message,
    Password,
    RouterLink,
    AutoFocus,
    Toast
  ],
  providers: [MessageService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  private readonly authService = inject(AuthApiService);
  private readonly tokenModelService = inject(TokenModelService);
  private readonly messageService = inject(MessageService);

  public loading: boolean = false;

  public data: ILoginDto = {
    email: '',
    password: '',
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.loading = true;
      this.authService.login(this.data).subscribe({
        next: data => this.tokenModelService.setTokens(data),
        error: (error: {error: IServerError}) => {
          this.messageService.add({life: 3000, severity: 'error', summary: 'Error', detail: error.error.message})
          this.loading = false;
        }
      })
    }
  }

}
