import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvisTechniqueService } from '../_services/avis-technique.service';
import { AvisTech } from '../_model/avis_Tech.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detail-lister-user',
  templateUrl: './detail-lister-user.component.html',
  styleUrls: ['./detail-lister-user.component.css']
})
export class DetailListerUserComponent implements OnInit {

  avisDetails: AvisTech;
  avisId: number;

  constructor(private route: ActivatedRoute, private avisService: AvisTechniqueService) { }

  ngOnInit(): void {
    this.getAvisDetails();
  }

  getAvisDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.avisId = id; // Assign the value to avisId
    this.avisService.getAvisDetailsUser(id)
      .subscribe(
        (data: AvisTech) => {
          this.avisDetails = data;
          console.log('Avis Technique Details:', this.avisDetails);
        },
        (error) => {
          console.error('Error fetching Avis Technique details:', error);
        }
      );
  }
 
  downloadFile(fileName: string): void {
    // Ensure that avisId is assigned before using it
    this.avisService.downloadFile(this.avisId, fileName).subscribe(
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
