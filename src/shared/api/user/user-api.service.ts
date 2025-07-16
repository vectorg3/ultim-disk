import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments';
import {IUser} from './models';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  public getUser(): Observable<IUser> {
    return this.http.get<IUser>(environment.apiUrl + '/user/me');
  }
}
