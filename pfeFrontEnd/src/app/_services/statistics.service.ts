import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }
  PATH_OF_API = 'http://localhost:8080/statistics';

  getStatusStatistics(): Observable<any> {
    return this.http.get(this.PATH_OF_API+'/status');
  }

  getTypeStatistics(): Observable<any> {
    return this.http.get(this.PATH_OF_API+'/type');
  }
}
