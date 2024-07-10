import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demand } from '../_model/demand.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http: HttpClient) { }

  addNewDemandeHomologation(demande: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:8080/demande/requestHomologation', demande);
}


addNewDemandeRetraitConformite(demande: FormData): Observable<any> {
  return this.http.post<any>('http://localhost:8080/demande/requestRetraitConformite', demande);
}


addNewDemandeConformite(demande: FormData): Observable<any> {
  return this.http.post<any>('http://localhost:8080/demande/requestConformite', demande);
}


addNewDemandeControlle(demande: FormData): Observable<any> {
  return this.http.post<any>('http://localhost:8080/demande/requestContrôleRadiomMgnétique', demande);
}


addNewDemandeAdmission(demande: FormData): Observable<any> {
  return this.http.post<any>('http://localhost:8080/demande/requestAdmissionTemporelle', demande);
}
getDemandeCurrentUser(): Observable<Demand[]> {
  return this.http.get<Demand[]>('http://localhost:8080/demande/demandeCurrentUser');
}

getAllDemands(): Observable<Demand[]> {
  return this.http.get<Demand[]>('http://localhost:8080/demande/getAllDemands');
}

getDemandeById(id: any): Observable<Demand> {
  return this.http.get<Demand>(`http://localhost:8080/demande/${id}/demandeDetails`);
}

deleteDemande(id: any): Observable<void> {
  return this.http.delete<void>(`http://localhost:8080/demande/deleteDemande/${id}`);
}

downloadFile(id: number, fileName: string): Observable<Blob> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/octet-stream'
  });

  return this.http.get(`http://localhost:8080/demande/${id}/downloadfiles/${fileName}`, {
    responseType: 'blob',
    headers: headers
  });

}


changeDemandStatus(id: number, newStatus: string): Observable<any> {
  // Construct URL with query parameter
  const url = `http://localhost:8080/demande/${id}/changeStatus`;

  // Construct query parameters
  const params = new HttpParams().set('newStatus', newStatus);

  // Make PUT request with query parameters
  return this.http.put(url, {}, { params }).pipe(
    catchError((error) => {
      throw error; // Handle error as needed
    })
  );
}
addDocumentsToDemand(id: number, files: FormData): Observable<Demand> {
  return this.http.post<Demand>(`http://localhost:8080/demande/${id}/addDocuments`, files);
}


// Example method for filtering demands by status
filterByStatus(status: string): Observable<Demand[]> {
  const url = `http://localhost:8080/demande/filterByStatus?status=${status}`;
  return this.http.get<Demand[]>(url);
}

// Example method for filtering demands by type
filterByType(type: string): Observable<Demand[]> {
  const url = `http://localhost:8080/demande/filterByType?type=${type}`;
  return this.http.get<Demand[]>(url);
}


}
