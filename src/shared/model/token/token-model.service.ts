import {Injectable} from '@angular/core';
import {ITokens, ITokensUnpacked} from './tokens.models';

@Injectable({
  providedIn: 'root'
})
export class TokenModelService {

  constructor() { }

  setTokens(tokens: ITokens) {
    localStorage.setItem('accessToken', JSON.stringify(tokens.accessToken));
    localStorage.setItem('refreshToken', JSON.stringify(tokens.refreshToken));
  }

  getTokens(): ITokensUnpacked {
    return {
      accessToken: localStorage.getItem('accessToken') ?? undefined,
      refreshToken: localStorage.getItem('refreshToken') ?? undefined,
    }
  }
}
