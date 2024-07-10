import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../_services/demande.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Demand } from '../_model/demand.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-radio',
  templateUrl: './demande-radio.component.html',
  styleUrls: ['./demande-radio.component.css']
})
export class DemandeRadioComponent implements OnInit {

  
  constructor(private demandeService:DemandeService,private router:Router,private route:ActivatedRoute) { }

RadioDemands:Demand[];
  demandsLoaded: boolean = false;

  ngOnInit(): void {
    this.fetchAllDemands()
  }

  fetchAllDemands(){
    this.demandeService.getAllDemands().subscribe(
      (response)=>{
        this.RadioDemands=response;
        this.demandsLoaded = true; // Set to true when data is loaded
        console.log(this.RadioDemands);
        
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
    this.router.navigate(['demande-Conformite-details', demandeId], { relativeTo: this.route.parent }); // Navigate relative to parent route
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

exportToExcel(): void {
  // Check if demands array is loaded
//   if (this.demandsLoaded) {
//     const filename = 'demands.xlsx';
//     const worksheetName = 'Demands';

//     /* Create workbook and worksheet */
//     const workbook = XLSX.utils.book_new();
//     const worksheet = XLSX.utils.json_to_sheet(this.AdmissionDemands, {
//       header: Object.keys(this.AdmissionDemands[0]),
//     });

//     /* Define column widths */
//     const columnWidths = [
//       { wch: 10 }, // Width of first column
//       { wch: 20 },
//       { wch: 30 },
//       // Add more as needed for other columns
//     ];

//     /* Set column widths */
//     worksheet['!cols'] = columnWidths;

//     /* Add worksheet to workbook */
//     XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);

//     /* Write workbook to file */
//     XLSX.writeFile(workbook, filename);
//   } else {
//     console.error('Demands data is not loaded yet.');
//   }
// }


}}
  