import { Component, OnInit } from '@angular/core';
import { Demand } from '../_model/demand.model';
import { DemandeService } from '../_services/demande.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-retrait-conformite',
  templateUrl: './demande-retrait-conformite.component.html',
  styleUrls: ['./demande-retrait-conformite.component.css']
})
export class DemandeRetraitConformiteComponent implements OnInit {

  retrait_homologationDemands:Demand[];
  constructor(private demandeService:DemandeService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchAllDemands()
  }

  fetchAllDemands(){
    this.demandeService.getAllDemands().subscribe(
      (response)=>{
        this.retrait_homologationDemands=response;
        console.log(this.retrait_homologationDemands);
        
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
    this.router.navigate(['demande-retraitConformite-details', demandeId], { relativeTo: this.route.parent }); // Navigate relative to parent route
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
