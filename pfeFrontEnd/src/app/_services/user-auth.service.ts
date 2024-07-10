import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  public setRoles(roles: any[]) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): any[] {
    return JSON.parse(localStorage.getItem('roles'));
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken');
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  public isAdmin() {
    const roles: any[] = this.getRoles();
    return roles && roles.length > 0 && roles[0].roleName === 'Admin';
  }
  
  public isUser() {
    const roles: any[] = this.getRoles();
    return roles && roles.length > 0 && roles[0].roleName === 'User';
  }
  

  public getUserName(): string {
    const token = this.getToken();
    if (!token) {
      return null;
    }
  
    // Split the token into its three parts: header, payload, and signature
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null; // Invalid token format
    }
  
    // Parse the payload, which is the second part
    const payload = JSON.parse(atob(parts[1]));

    // Check if the payload contains the user ID
    if (payload && payload.sub) {
      return payload.sub;
    } else {

      return null; // User ID not found in payload
      
    }
    
  }
  
}
