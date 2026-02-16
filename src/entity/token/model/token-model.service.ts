import {Injectable} from '@angular/core';
import {ITokens, ITokensUnpacked} from '@entity/token/model/tokens.models';

@Injectable({
  providedIn: 'root'
})
export class TokenModelService {

  constructor() { }

  setTokens(tokens: ITokens) {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  getTokens(): ITokensUnpacked {
    return {
      accessToken: String(localStorage.getItem('accessToken')) ?? undefined,
      refreshToken: String(localStorage.getItem('refreshToken')) ?? undefined,
    }
  }

  clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
