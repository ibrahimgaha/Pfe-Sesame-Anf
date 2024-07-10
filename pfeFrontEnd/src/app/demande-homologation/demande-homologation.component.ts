import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../_services/demande.service';
import { Demand } from '../_model/demand.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-homologation',
  templateUrl: './demande-homologation.component.html',
  styleUrls: ['./demande-homologation.component.css']
})
export class DemandeHomologationComponent implements OnInit {


  homologationDemands:Demand[];
  constructor(private demandeService:DemandeService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchAllDemands()
  }

  fetchAllDemands(){
    this.demandeService.getAllDemands().subscribe(
      (response)=>{
        this.homologationDemands=response;
        console.log(this.homologationDemands);
        
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  deleteDemande(id:any){
    this.demandeService.deleteDemande(id).subscribe(
      (response)=>{
        console.log(response);
        this.fetchAllDemands();
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  redirectToDetails(demandeId: number): void {
    this.router.navigate(['demande-homologation-details', demandeId], { relativeTo: this.route.parent }); // Navigate relative to parent route
  }

  changeStatus(demandId: number, newStatus: string): void {
    this.demandeService.changeDemandStatus(demandId, newStatus).subscribe(
        (response) => {
            console.log(response);
            this.fetchAllDemands();
            Swal.fire({
                title: "Status Changed!",
                text: "Demand status has been updated.",
                icon: "success"
            });
        },
        (error) => {
            console.error(error);
        }
    );
}


}
