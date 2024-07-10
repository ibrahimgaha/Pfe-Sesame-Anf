import { Component, OnInit } from '@angular/core';
import { AvisTechniqueService } from '../_services/avis-technique.service';
import { AvisTech } from '../_model/avis_Tech.model';
import { UserAuthService } from '../_services/user-auth.service';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lister-avis-tech-user',
  templateUrl: './lister-avis-tech-user.component.html',
  styleUrls: ['./lister-avis-tech-user.component.css']
})
export class ListerAvisTechUserComponent implements OnInit {
  avisTechniques: any[];


  constructor(private avisService: AvisTechniqueService,private authService:UserAuthService,private router:Router) { }

  ngOnInit(): void {
    this.getAvisTechniquesForUser();
  }

  getAvisTechniquesForUser(): void {
    this.avisService.getAvisTechniquesForCurrentUser().subscribe(
      (data: AvisTech[]) => {
        this.avisTechniques = data.filter(avis => avis.response);
        console.log('Avis Techniques with response:', this.avisTechniques);
  
        this.avisTechniques.forEach(avis => {
          try {
            if (this.isValidJson(avis.response)) {
              const parsedResponse = JSON.parse(avis.response);
              avis.responseText = parsedResponse.response;
            } else {
              avis.responseText = avis.response; 
            }
          } catch (error) {
            console.error('Error parsing JSON:', error);
            console.log('Response:', avis.response);
            avis.responseText = 'Error parsing response JSON';
          }
        });
      },
      (error) => {
        console.error('Error fetching Avis Techniques:', error);
      }
    );
  }
  
  isValidJson(str: string): boolean {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
  navigateToDetails(avisId: number): void {
    this.router.navigate(['/detailsListerUser', avisId]); 
  }
  
  
  

}
