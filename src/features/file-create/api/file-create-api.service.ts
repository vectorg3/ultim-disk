import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments';


export interface IFileCreateDto {
  name: string;
  type: string;
  parent?: string;
}
@Injectable({
  providedIn: 'root'
})
export class FileCreateApiService {

  constructor(private http: HttpClient) { }

  createDir(body: IFileCreateDto) {
    return this.http.post(environment.apiUrl + '/disk', body)
  }
}
