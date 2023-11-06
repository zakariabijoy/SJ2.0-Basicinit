import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { PaginationParams } from '../model/paginationParams';


@Injectable({
  providedIn: 'root'
})
export class FileService {
  baseUrl = environment.apiUrl;
  paginationParams: PaginationParams;
  constructor(private http: HttpClient) {
    this.paginationParams = new PaginationParams()
   }

  getFileContents(paginationParams :PaginationParams){
    let params = getPaginationHeaders(paginationParams.pageNumber, paginationParams.pageSize);
    params = params.append('searchTerm', paginationParams.searchTerm);
    return getPaginatedResult<any[]>(this.baseUrl + 'FileUpload/file-contents', params, this.http);
  }

  getFileContentById(id:string){
    return this.http.get<any>(this.baseUrl + `FileUpload/file-content-by-id?id=${id}`);
  }

  fileContentUpsert(filecontent:any){
    return this.http.post(this.baseUrl + 'FileUpload/upsert-file-content', filecontent);
  }

  getFileContentParams() {
    return this.paginationParams;
  }

  setFileContentParams(params: PaginationParams) {
    this.paginationParams = params;
  }

  deleteFileContentById(id:string){
    return this.http.delete<any>(this.baseUrl + `FileUpload/delete-file-content-by-id?id=${id}`);
  }
}
