import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-voir-profile',
  templateUrl: './voir-profile.component.html',
  styleUrls: ['./voir-profile.component.css']
})
export class VoirProfileComponent implements OnInit {
  currentUser: any = {}; 

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: UserAuthService
  ) { }

  ngOnInit(): void {
    const username = this.authService.getUserName();
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

  ModifierMotDePasse() {
    this.router.navigate(['changePassword']);
  }

  UpdateProfile() {
    this.router.navigate(['updateProfile']);
  }
}
