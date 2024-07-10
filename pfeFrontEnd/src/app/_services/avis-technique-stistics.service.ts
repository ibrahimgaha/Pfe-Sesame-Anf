import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisTechniqueStatisticsService {
  
  constructor(private http: HttpClient) { }
  PATH_OF_API = 'http://localhost:8080/statisticsAvis';


  getStatusAvisStatistics(): Observable<any> {
    return this.http.get(this.PATH_OF_API+'/avis-technique-status');
  }

}
