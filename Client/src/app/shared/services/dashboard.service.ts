import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { PaginationParams } from '../model/paginationParams';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
   }

  getColumnSeries(){
    return this.http.get<any[]>(this.baseUrl + 'dashboard/column-series');
  }

  getAreaSeries(){
    return this.http.get<any>(this.baseUrl + 'dashboard/area-series');
  }
}
