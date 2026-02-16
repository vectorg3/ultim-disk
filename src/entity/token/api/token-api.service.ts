import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@env/environment';
import {ITokens} from '@entity/token/model';

@Injectable({
  providedIn: 'root'
})
export class TokenApiService {

  constructor(private http: HttpClient) { }

  refreshTokens(refreshToken: string): Observable<ITokens> {
    return this.http.post<ITokens>(environment.apiUrl + '/auth/refresh', {refreshToken});
  }
}
