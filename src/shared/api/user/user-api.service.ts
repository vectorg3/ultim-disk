import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {IUser} from '@shared/api';
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
