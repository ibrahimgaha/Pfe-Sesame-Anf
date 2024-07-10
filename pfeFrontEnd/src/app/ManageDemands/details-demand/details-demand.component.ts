  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { Demand } from 'src/app/_model/demand.model';
  import { DemandeService } from 'src/app/_services/demande.service';
import Swal from 'sweetalert2';

  @Component({
    selector: 'app-details-demand',
    templateUrl: './details-demand.component.html',
    styleUrls: ['./details-demand.component.css']
  })
  export class DetailsDemandComponent implements OnInit {
    demandeId: number;
    demandeDetails: any;

    constructor(private demandeService: DemandeService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.demandeId = +params['id']; // Extract demandeId from route parameters
        this.getDemandeDetails();
        console.log(this.demandeId);
        
      });
    }

    getDemandeDetails() {
      this.demandeService.getDemandeById(this.demandeId).subscribe(
        data => {
          // Assuming getDemandeById() returns a single Demand object, not an array
          this.demandeDetails = data; 
          console.log(this.demandeDetails);
        },
        error => {
          console.log(error);
        }
      );
    }


    downloadFile(fileName: string): void {
      this.demandeService.downloadFile(this.demandeId, fileName).subscribe(
        (data: Blob) => {
          const blob = new Blob([data]);
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        },
        error => {
          // Handle error
          console.error('Error downloading file:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred while downloading the file!',
          });
        }
      );
    }
  }
