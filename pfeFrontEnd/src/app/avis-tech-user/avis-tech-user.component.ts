import { Component, OnInit } from '@angular/core';
import { AvisTechniqueService } from '../_services/avis-technique.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { AvisTech } from '../_model/avis_Tech.model';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-avis-tech-user',
  templateUrl: './avis-tech-user.component.html',
  styleUrls: ['./avis-tech-user.component.css']
})
export class AvisTechUserComponent implements OnInit {

avis:AvisTech={
  nomEquipement:"",
  question:"",
  selectedAvisTechnique:"",
  envoye_Le:"",
  repondu_le:"", 
  avisDocument:[],
  response:""
}

selectedFileNames: string[] = [];
  

  constructor(private avisTechniqueService: AvisTechniqueService, private datePipe: DatePipe,private sanitizer:DomSanitizer) { }

  ngOnInit(): void { }


  




  submitFormAvis(avisTechForm: NgForm) {
    const envoye_Le = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.avis.envoye_Le = envoye_Le;
  
    const avisFormData = this.prepareFormData(this.avis);
    
    console.log(avisFormData);
    
    // Log the form data before submitting
    
    
    this.avisTechniqueService.addAviTechnique(avisFormData)
        .subscribe(
          response => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Votre avis a été soumis avec succès.",
              showConfirmButton: false,
              timer: 1500
            });
            console.log('Avis Form Data:', response);
          },
          error => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Erreur lors de la soumission de l'avis.",
              showConfirmButton: false,
              timer: 1500
            });
          }
        );
  }
  
  prepareFormData(avis:AvisTech):FormData{
    const formData= new FormData();
    formData.append(
      'avisTechnique',
      new Blob([JSON.stringify(avis)],{type: 'application/json'})

    );

    for(var i=0;i<avis.avisDocument.length;i++){
      formData.append(
        'document',
        avis.avisDocument[i].file,
        avis.avisDocument[i].file.name
      )

    }
    
    return formData;

  }

  onFileSelected(event) {
    if (event.target.files) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileHandle: FileHandle = {
          file: file,
          url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
        };
        this.avis.avisDocument.push(fileHandle);
      }
    }
  }

  removeFile(index: number): void {
    this.avis.avisDocument.splice(index, 1);
  }
  
  
    }
 
