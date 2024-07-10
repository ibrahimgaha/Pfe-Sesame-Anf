import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changer-mot-de-passe',
  templateUrl: './changer-mot-de-passe.component.html',
  styleUrls: ['./changer-mot-de-passe.component.css']
})
export class ChangerMotDePasseComponent implements OnInit {

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  currentUser:any={}


  constructor(
    private userService: UserService,
    private authService: UserAuthService
  ) { }

  ngOnInit(): void {
    const username = this.authService.getUserName();
   
    
    this.userService.getCurrentUser(username).subscribe(
      (response: any) => {
        this.currentUser = response;
        console.log(response.userName);
        this.currentUser.profileImage = 'data:image/png;base64,' + this.currentUser.profileImage;

      },
      (error) => {
        console.error('Error fetching current user data:', error);
      }
    );
  }

  changePassword(): boolean {
    
    if (this.newPassword !== this.confirmPassword) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title:"New password and confirmation password do not match",
        showConfirmButton: false,
        timer: 2000
      });
      return false;
    }
  
    const username = this.authService.getUserName();
  
    this.userService.changePassword(username, this.currentPassword, this.newPassword).subscribe((hoh: any) => {
        console.log(hoh);
        
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your password has been updated.",
          showConfirmButton: false,
          timer: 2000
        });
        
      }
      
    );
    return true;

  }
  

}
