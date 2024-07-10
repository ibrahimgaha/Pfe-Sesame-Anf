import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:8080';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public login(loginData) {
    return this.httpClient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  public forUser() {
    return this.httpClient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }

  public forIntervenant() {
    return this.httpClient.get(this.PATH_OF_API + '/forIntervenant', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpClient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }

  public registerUser(registerData:any){
    return this.httpClient.post<any>(this.PATH_OF_API+"/registerNewUser",registerData,{headers: this.requestHeader,});
  }

 

  public getCurrentUser(userName:any){
    return this.httpClient.get<any>(this.PATH_OF_API+"/current-user",userName);
  }

  updateUser(userData: any) {
    return this.httpClient.put<any>(`${this.PATH_OF_API}/update-user`, userData);
  }

 // userService.ts
getAllUsers(searchKey: string = ''): Observable<any[]> {
  return this.httpClient.get<any[]>(`${this.PATH_OF_API}/getAllUsers?searchKey=${searchKey}`);
}


  changePassword(username: string, currentPassword: string, newPassword: string) {

    return this.httpClient.post(`${this.PATH_OF_API}/change-password`, {
      username,
      currentPassword,
      newPassword
    });
  }

  uploadProfileImage(userId: string, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return this.httpClient.post(`${this.PATH_OF_API}/${userId}/profile-image`, formData);
  }
  
  updateProfileImage(userId: string, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return this.httpClient.put(`${this.PATH_OF_API}/${userId}/profile-image`, formData);
  }
  


  deleteUserByIdForAdmin(userId: string) {
    return this.httpClient.delete<any>(`${this.PATH_OF_API}/${userId}/deleteUser`);
  }
  


  updateUserByIdForAdmin(id:string,userData: any) {
    return this.httpClient.put<any>(`${this.PATH_OF_API}/${id}/update-user-admin`,userData);
  }


  

}
