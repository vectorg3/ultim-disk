import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {IUser} from '@entity/user/model/models';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private http = inject(HttpClient);

  public getUser(): Observable<IUser> {
    return this.http.get<IUser>(environment.apiUrl + '/user/me');
  }
}
