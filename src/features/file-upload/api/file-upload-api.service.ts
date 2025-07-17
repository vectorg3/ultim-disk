import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {IFileStackItem} from '@entity/file';

@Injectable({
  providedIn: 'root'
})
export class FileUploadApiService {

  constructor(private http: HttpClient) { }

  uploadFileToServer(file: File, dir?: IFileStackItem) {
    const formData = new FormData();
    formData.append('file', file);
    let params = new HttpParams();
    if (dir) params = params.append('parent', dir._id);
    return this.http.post(environment.apiUrl + '/disk/upload', formData, {params})
  }
}
