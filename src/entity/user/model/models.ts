import {InjectionToken} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface IUser {
  _id: string;
  name: string;
  email: string;
}

export const USER_TOKEN = new InjectionToken<BehaviorSubject<IUser | null>>('USER_TOKEN');
