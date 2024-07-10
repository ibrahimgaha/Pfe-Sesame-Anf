import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gerer-users',
  templateUrl: './gerer-users.component.html',
  styleUrls: ['./gerer-users.component.css']
})
export class GererUsersComponent implements OnInit {

  Users: any[] = [];

  userToUpdate: any = {
    userName: "",
    userFirstName: "",
    userLastName: "",
    adresse: "",
    email: "",
    telMobile: "",
    isAdmin: false,
  }

  searchText: string = '';

  

  constructor(private serviceUser: UserService,private authService:UserAuthService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.serviceUser.getAllUsers(this.searchText).subscribe(
      (resp) => {
        console.log('Users fetched:', resp); // Log the fetched users
        this.Users = resp;
        // Manipulate the profile image URLs here
        this.Users.forEach(user => {
          if (user.profileImage && typeof user.profileImage === 'string') {
            // Ensure profileImage is a non-empty string before manipulation
            user.profileImage = 'data:image/png;base64,' + user.profileImage;
          } else {
            console.warn('Invalid profile image data for user:', user);
            // Handle or log the error accordingly
          }
        });
      },
      (error) => {
        console.error('Error fetching users:', error);
        // Handle the error accordingly
      }
    );
  }

  onSearch(): void {
    this.getAllUsers();
  }
  
  


  deleteUser(userId: string) {
    console.log('User ID to delete:', userId); // Add this line to log the user ID
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(userId);
        this.serviceUser.deleteUserByIdForAdmin(userId).subscribe(
          (resp) => {
            console.log(resp);
            this.getAllUsers();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }
  
  edit(user: any){
    this.userToUpdate = { ...user }; // Use spread operator to copy properties
  }

updateUser(){
  this.serviceUser.updateUser(this.userToUpdate).subscribe(
    (resp) => {
      console.log(resp);
      this.getAllUsers();
      Swal.fire({
        title: "Updated!",
        text: "Your file has been updated.",
        icon: "success"
      });
    },
    (error) => {
      console.error(error);
    }
  );
}

}
