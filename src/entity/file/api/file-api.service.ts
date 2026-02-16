import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {IFileModel, IFileStackItem} from '@entity/file/model';
import {filter, map} from 'rxjs';
import {IFileCreateDto} from '@entity/file/api/models';

@Injectable({
  providedIn: 'root'
})
export class FileApiService {
  private http = inject(HttpClient);

  getFilesList(dir?: string) {
    let params = new HttpParams();
    if (dir) params = params.append('parent', dir);
    return this.http.get<IFileModel[]>(environment.apiUrl + '/disk', {params});
  }

  createDir(body: IFileCreateDto) {
    return this.http.post(environment.apiUrl + '/disk', body)
  }

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

  deleteFileOrDir(id: string) {
    let params = new HttpParams();
    params = params.append('fileId', id)
    return this.http.delete(environment.apiUrl + '/disk/delete', {params})
  }
}
