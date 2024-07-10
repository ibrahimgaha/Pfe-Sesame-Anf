import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService : UserService, private router: Router) { }

  ngOnInit(): void {
  }


  registerUser(registerForm: FormGroup) {
    // Check for empty fields before submitting
    const emptyFields = [];
    for (const controlName in registerForm.controls) {
      if (registerForm.controls[controlName].value === '') {
        emptyFields.push(controlName);
      }
    }

    if (emptyFields.length > 0) {
      // Display error message with list of empty fields
      Swal.fire({
        icon: 'error',
        title: 'Please fill in all required fields!',
        text: `The following fields are empty: ${emptyFields.join(', ')}`,
      });
      return; // Prevent form submission if there are empty fields
    }

    this.userService.registerUser(registerForm.value).subscribe(
      (resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Done!',
          text: 'Your account has been created.',
        });

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    );
  }
}
  
