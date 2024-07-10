import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AvisTechniqueService } from '../_services/avis-technique.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-avis-tech-admin',
  templateUrl: './avis-tech-admin.component.html',
  styleUrls: ['./avis-tech-admin.component.css']
})
export class AvisTechAdminComponent implements OnInit {

  avisTechniques: any[] = [];
  avisSubscription: Subscription | undefined;
  showLoadButton=false;
  pageNumber:number = 0;
  showRepondu = false;
  showPasRepondu = false;
  filteredAvisTechniques: any[] = [];
  selectedStatus: string="";
  selectedDate: Date | null = null;











  constructor(private avisService: AvisTechniqueService, private router: Router,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loadAvisTechniques();
  }



 
  redirectToResponse(avisId: number): void {
    this.router.navigate(['/admin-dashboard/avis-technique-admin/avis-technique-responeToUser', avisId]);
  }
 
loadAvisTechniques(searchKey: string = "") {
    if (this.avisSubscription) {
        this.avisSubscription.unsubscribe();
    }

    this.avisSubscription = this.avisService.receiveAvisTechnique(this.pageNumber, searchKey).subscribe(data => {
        console.log('Received AvisTechnique data:', data);
        if (data.length == 4) {
            this.showLoadButton = true;
        } else {
            this.showLoadButton = false;
        }

        // Append new data to the existing array
        data.forEach((avis: any) => {
            this.avisService.getAvisTechniqueStatus(avis.id).subscribe(status => {
                avis.status = status; // Assign the fetched status to each avis
                this.avisTechniques.push(avis); // Append the avis to the existing array
            });
        });
        this.applyFilter();

    });
}



applyFilter() {
  // Filter the AvisTechniques based on the selected status
  if (this.selectedStatus) {
    this.filteredAvisTechniques = this.avisTechniques.filter(avis => avis.status === this.selectedStatus);
  } else {
    this.filteredAvisTechniques = this.avisTechniques; // Show all Avis if no status is selected
  }
}


 







  getUniqueQuestionTypes(): string[] {
    // Extract unique question types from avisTechniques array
    return Array.from(new Set(this.avisTechniques.map(avis => avis.selectedAvisTechnique)));
  }
  

  deleteAvisTechnique(id: number): void {
    Swal.fire({
      title: "Êtes-vous sûr?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, Effacer!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.avisService.deleteAvisTechnique(id).subscribe(() => {
          Swal.fire({
            title: "Supprimé!",
            text: "Votre fichier a été supprimé.",
            icon: "success"
          });
          this.loadAvisTechniques();
        });
      }
    });
  }

  exportToExcel(): void {
    const filename = 'avis-technique.xlsx';
    const worksheetName = 'Avis Techniques';
  
    /* Create workbook and worksheet */
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(this.avisTechniques, { header: Object.keys(this.avisTechniques[0]) });
  
    /* Define column widths */
    const columnWidths = [
      { wch: 5 },  // Width of first column
      { wch: 35 },
      { wch: 50 },
      { wch: 35 },
      { wch:35 },
      { wch: 35 },
      { wch: 35 },
      { wch: 50 },  // Width of second column
      // Add more as needed for other columns
    ];
  
    /* Set column widths */
    worksheet['!cols'] = columnWidths;
  
    /* Add worksheet to workbook */
    XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
  
    /* Write workbook to file */
    XLSX.writeFile(workbook, filename);
  }

public loadMoreAvis(){
  this.pageNumber=this.pageNumber+1;
  this.loadAvisTechniques();

}


applyDateFilter() {
  if (!this.selectedDate) {
    // If no date is selected, do nothing
    return;
  }

  // Filter the AvisTechniques based on the selected date
  this.filteredAvisTechniques = this.avisTechniques.filter(avis => {
    // Assuming the date format in 'avis' is compatible with JavaScript Date objects
    // Change this logic if needed based on your data structure
    const avisDate = new Date(avis.envoye_Le); // Assuming 'envoye_Le' is the date field in 'avis'
    return avisDate.toDateString() === this.selectedDate.toDateString();
  });
}


searchByKeyWord(searchKeyWord){

  this.pageNumber=0
  this.avisTechniques=[];
  this.loadAvisTechniques(searchKeyWord)
  console.log(searchKeyWord);
  
}



}


  

