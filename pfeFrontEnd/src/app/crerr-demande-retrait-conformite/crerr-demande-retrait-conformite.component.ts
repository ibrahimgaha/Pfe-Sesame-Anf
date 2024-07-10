import { Component, OnInit } from '@angular/core';
import { AvisTech } from '../_model/avis_Tech.model';
import { FileHandle } from '../_model/file-handle.model';
import { Lieu } from '../_model/LieuEquipment.model'; // Import Lieu interface here
import { DemandeService } from '../_services/demande.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { Equipement } from '../_model/equipment.model';
import { Demand } from '../_model/demand.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crerr-demande-retrait-conformite',
  templateUrl: './crerr-demande-retrait-conformite.component.html',
  styleUrls: ['./crerr-demande-retrait-conformite.component.css']
})
export class CrerrDemandeRetraitConformiteComponent implements OnInit {
  selectedValue: string;
  constructor(private demandeService: DemandeService, private sanitizer: DomSanitizer, private datePipe: DatePipe) { }

  equipment: Equipement = {
    modele: "",
    marque: "",
    quantite: 0,
    type: ""
  };
  selectedPlace: string;
  demande: Demand = {
    equipement: [], // Initialize as an empty array
    demandeFiles: [],
    envoyeLe: '', // Corrected property name
    datePremierCompliment: '',
    dateDeuxiemeCompliment: ''
  };
 

  ngOnInit(): void { }

  onFileSelected(event) {
    if (event.target.files) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileHandle: FileHandle = {
          file: file,
          url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
        };
        this.demande.demandeFiles.push(fileHandle);
      }
    }
  }
  SubmitDemandeRetraitConformite(demandeRetConfForm: NgForm) {



    this.demande.equipement.push(this.equipment);
  


    const envoye_Le = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.demande.envoyeLe = envoye_Le;
    
    let demandeFormData = this.prepareFormData(this.demande);
    

    console.log('FormData before sending:', demandeFormData);
    this.demandeService.addNewDemandeRetraitConformite(demandeFormData).subscribe(
      (response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your request has been sent Successfully",
          showConfirmButton: false,
          timer: 1500
        });
      },
      error => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "There is an Error Come back later",
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }
  

  prepareFormData(demand: Demand): FormData {
    const formData = new FormData();
    formData.append('demande', new Blob([JSON.stringify(demand)], { type: 'application/json' }));
    for (let i = 0; i < demand.demandeFiles.length; i++) {
      formData.append('files', demand.demandeFiles[i].file);
    }

    // Append each equipment 
    formData.append('equipements', new Blob([JSON.stringify(demand.equipement)], { type: 'application/json' }));

    return formData;
  }


  removeFile(file: FileHandle) {
    const index = this.demande.demandeFiles.indexOf(file);
    if (index !== -1) {
      this.demande.demandeFiles.splice(index, 1);
    }
  }

 
}
