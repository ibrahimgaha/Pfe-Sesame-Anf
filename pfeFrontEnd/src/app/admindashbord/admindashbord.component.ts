import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashbord',
  templateUrl: './admindashbord.component.html',
  styleUrls: ['./admindashbord.component.css']
})
export class AdmindashbordComponent implements OnInit {

  constructor( private userAuthService: UserAuthService,
    private router: Router,) { }
  
  ngOnInit(): void {
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }

}
