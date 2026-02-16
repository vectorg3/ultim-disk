import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {filter, map} from 'rxjs';
import {IFileStackItem} from '@entity/file/model';

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
    return this.http.post(environment.apiUrl + '/disk/upload', formData, {
      params,
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            return Math.round((100 * event.loaded) / event.total!);
          case HttpEventType.Response:
            return 'Upload complete';
          default:
            return null;
        }
      }),
      filter((value) => value !== null))
  }
}
