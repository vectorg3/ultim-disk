import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {IFileCreateDto} from '@features/file-create';

@Injectable({
  providedIn: 'root'
})
export class FileCreateApiService {

  constructor(private http: HttpClient) { }

  createDir(body: IFileCreateDto) {
    return this.http.post(environment.apiUrl + '/disk', body)
  }
}
