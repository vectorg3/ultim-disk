import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {IFileModel} from '@entity/file';

@Injectable({
  providedIn: 'root'
})
export class FileApiService {

  constructor(private http: HttpClient) { }

  getFilesList(dir?: string) {
    let params = new HttpParams();
    if (dir) params = params.append('parent', dir);
    return this.http.get<IFileModel[]>(environment.apiUrl + '/disk', {params});
  }
}
