import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILoginDto, IRegisterDto} from '../model';
import {environment} from '@env/environment';
import {ITokens} from '@shared/model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private http: HttpClient) { }

  login(req: ILoginDto): Observable<ITokens> {
    return this.http.post<ITokens>(environment.apiUrl + '/auth/login', req);
  }

  signup(req: IRegisterDto): Observable<ITokens> {
    return this.http.post<ITokens>(environment.apiUrl + '/auth/signup', req);
  }
}
