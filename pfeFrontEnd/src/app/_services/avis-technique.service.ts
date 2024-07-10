import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvisTech } from '../_model/avis_Tech.model';
import { AvisTechniqueStatus } from '../_model/AvisTechniqueStatus.model';

@Injectable({
  providedIn: 'root'
})
export class AvisTechniqueService {
  getUserName(): string {
    throw new Error('Method not implemented.');
  }
  PATH_OF_API = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public addAviTechnique(avisTechniqueData: FormData) {
    return this.http.post<AvisTech>(this.PATH_OF_API + '/avis-technique/request', avisTechniqueData);
  }

  receiveAvisTechnique(pageNumber,searchKeyWord:string=""): Observable<any[]> {
    return this.http.get<any[]>(this.PATH_OF_API + '/avis-technique/all?pageNumber='+pageNumber+"&searchKey="+searchKeyWord);
  }

  deleteAvisTechnique(id: number): Observable<void> {
    return this.http.delete<void>(`${this.PATH_OF_API}/avis-technique/delete/${id}`);
  }

  getAvisDetailsAdmin(avisId: number): Observable<any> {
    return this.http.get<any>(`${this.PATH_OF_API}/avis-technique/${avisId}/admin/`);
  }


  getAvisDetailsUser(avisId: number): Observable<any> {
    return this.http.get<any>(`${this.PATH_OF_API}/avis-technique/${avisId}/user/`);
  }

  submitResponse(avisId: number, response: string, files: File[]): Observable<any> {
    const formData = new FormData();
    formData.append('response', response);
    files.forEach(file => {
      formData.append('files', file); // append each file under the 'files' key
    });
    return this.http.post<any>(`${this.PATH_OF_API}/avis-technique/${avisId}/response`, formData);
  }
  
  
  
  getAvisTechniqueStatus(avisId: number): Observable<AvisTechniqueStatus> {
    return this.http.get<AvisTechniqueStatus>(`${this.PATH_OF_API}/avis-technique/reviews/${avisId}/status`);
  }


  getAvisTechniquesForCurrentUser(): Observable<AvisTech[]> {
    return this.http.get<AvisTech[]>('http://localhost:8080/avis-technique/user');
  }




  downloadFile(avisId: number, fileName: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/octet-stream'
    });

    return this.http.get(`${this.PATH_OF_API}/avis-technique/${avisId}/downloadfiles/${fileName}`, {
      responseType: 'blob',
      headers: headers
    });
  }

 
  

}
