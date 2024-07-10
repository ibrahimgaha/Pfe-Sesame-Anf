import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  currentUser: any = {}; 
  selectedFile: File = null;

  constructor(
    private userService: UserService,
    private authService: UserAuthService
  ) { }

  ngOnInit(): void {
    const username = this.authService.getUserName();
    this.userService.getCurrentUser(username).subscribe(
      (data: any) => {
        this.currentUser = data;
        // Assuming profileImage is a Base64-encoded string
        // Decode the Base64 string to display the image
        this.currentUser.profileImage = 'data:image/png;base64,' + this.currentUser.profileImage;
      },
      (error) => {
        console.error('Error fetching current user data:', error);
      }
    );
  }
  


  update(): void {
    this.userService.updateUser(this.currentUser).subscribe(
      (response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your profile has been updated.",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        console.error('Error updating user data:', error);
      }
    );
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);
  }

  uploadImage(): void {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }

    console.log('Uploading image:', this.selectedFile);

    const username = this.authService.getUserName();
    const isUpdate = !!this.currentUser.profileImage;

    const imageAction = isUpdate ? 'updated' : 'uploaded';

    const imageServiceCall = isUpdate ?
      this.userService.updateProfileImage(username, this.selectedFile) :
      this.userService.uploadProfileImage(username, this.selectedFile);

    imageServiceCall.subscribe(
      () => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Profile image ${imageAction} successfully.`,
          showConfirmButton: false,
          timer: 1500
        });

        this.currentUser.profileImage = this.selectedFile;
      },
      (error) => {
        console.error(`Error ${isUpdate ? 'updating' : 'uploading'} profile image:`, error);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Profile image ${imageAction} successfully.`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

}
