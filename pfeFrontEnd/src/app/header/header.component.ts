import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService
  ) {}
  currentUser: any = {}; 


  actions = [
    { label: 'Demander un Avis Technique', routerLink: '/action-1' },
    { label: 'Lister mes Avis ', routerLink: '/action-2' },

    
  ];

  ngOnInit(): void {
    const username = this.userAuthService.getUserName();
    this.userService.getCurrentUser(username).subscribe(
      (data: any) => {
        this.currentUser = data;
        this.currentUser.profileImage = 'data:image/png;base64,' + this.currentUser.profileImage;
      },
      (error) => {
        console.error('Error fetching current user data:', error);
      }
    );
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }
 
  public isAdmin(){
   return  this.userAuthService.isAdmin();
  }
  public isUser(){
    return this.userAuthService.isUser();
  }
}
