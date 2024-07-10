import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-demands',
  templateUrl: './choose-demands.component.html',
  styleUrls: ['./choose-demands.component.css']
})
export class ChooseDemandsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navigateToPage_Homologation(){
    this.router.navigate(["admin-dashboard/demande-homologation"]);

  }
  navigateToPage_Conformite(){
    this.router.navigate(["admin-dashboard/demande-conformite"]);

  }

  navigateToPageRetraits_Conformite(){
    this.router.navigate(["admin-dashboard/demande-retrait-conformite"]);

  }


  navigateToPagesMagnetic(){
    this.router.navigate(["admin-dashboard/demande-radio"]);

    
}

navigateToPageAdmission(){
  this.router.navigate(["admin-dashboard/demande-Admission"]);

}



}
