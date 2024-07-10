import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvisTechniqueService } from '../_services/avis-technique.service';
import Swal from 'sweetalert2';
import { AvisTech } from '../_model/avis_Tech.model';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle.model';

@Component({
  selector: 'app-response-to-user-avis',
  templateUrl: './response-to-user-avis.component.html',
  styleUrls: ['./response-to-user-avis.component.css']
})
export class ResponseToUserAvisComponent implements OnInit {

  avisId: number;
  avisDetails: AvisTech;
  response: string;
  selectedFiles: FileHandle[] = [];
  selectedFileNames: string[] = [];

  @ViewChild('fileInput') fileInput: any;

  constructor(private route: ActivatedRoute, private avisService: AvisTechniqueService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.avisId = +params['id'];
      console.log('Avis ID:', this.avisId);
      this.getAvisDetails(this.avisId);
    });
  }

  getAvisDetails(avisId: number): void {
    this.avisService.getAvisDetailsAdmin(avisId).subscribe(data => {
      this.avisDetails = data;
      console.log('Avis Details:', this.avisDetails);
    });
  }

  handleFileUpload(event: any): void {
    if (event.target.files) {
      const files: FileList = event.target.files;
      this.selectedFileNames = [];
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];
        const fileHandle: FileHandle = {
          file: file,
          url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
        };
        this.selectedFiles.push(fileHandle);
        this.selectedFileNames.push(file.name);
      }
    }
  }

  submitResponse(): void {
    console.log('Response:', this.response);
    console.log('Files:', this.selectedFiles);

    const currentDate = new Date().toISOString();
    this.avisDetails.repondu_le = currentDate;

    this.avisService.submitResponse(this.avisId, this.response, this.selectedFiles.map(fileHandle => fileHandle.file)).subscribe(
      response => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Votre avis a été soumis avec succès.",
          showConfirmButton: false,
          timer: 1500
        });
      },
      error => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Votre avis a été soumis avec succès.",
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  downloadFile(fileName: string): void {
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

  removeFile(index: number): void {
    this.selectedFileNames.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }
  
}
