import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IUser} from '@entity/user/model/models';

@Injectable({
  providedIn: 'root'
})
export class UserModelService {
  public currentUser$ = new BehaviorSubject<IUser | null>(null);
}
