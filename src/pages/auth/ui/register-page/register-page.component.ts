import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Card} from 'primeng/card';
import {InputIcon} from 'primeng/inputicon';
import {IconField} from 'primeng/iconfield';
import {AutoFocus} from 'primeng/autofocus';
import {InputText} from 'primeng/inputtext';
import {IRegisterDto} from '../../model';
import {FormsModule} from '@angular/forms';
import {FocusTrap} from 'primeng/focustrap';
import {Button} from 'primeng/button';
import {Password} from 'primeng/password';
import {Message} from 'primeng/message';
import {RouterLink} from '@angular/router';
import {IServerError, TokenModelService} from '../../../../shared';
import {AuthApiService} from '../../api';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';

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
    RouterLink,
    Toast
  ],
  providers: [MessageService],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent {
  private readonly authService = inject(AuthApiService);
  private readonly tokenModelService = inject(TokenModelService);
  private readonly messageService = inject(MessageService);

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
        next: data => this.tokenModelService.setTokens(data),
        error: (error: {error: IServerError}) => {
          this.messageService.add({life: 3000, severity: 'error', summary: 'Error', detail: error.error.message})
          this.loading = false;
        }
      })
    }
  }
}
