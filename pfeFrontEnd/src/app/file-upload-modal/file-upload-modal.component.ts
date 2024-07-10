import { Component, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DemandeService } from '../_services/demande.service';
import { Demand } from '../_model/demand.model';

@Component({
  selector: 'app-file-upload-modal',
  templateUrl: './file-upload-modal.component.html',
  styleUrls: ['./file-upload-modal.component.css']
})
export class FileUploadModalComponent {
  selectedFiles: File[] = [];

  constructor(
    public dialogRef: MatDialogRef<FileUploadModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { demandId: number },
    private demandeService: DemandeService
  ) { }


  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.handleFiles(event.dataTransfer.files);
  }

  @HostListener('document:dragover', ['$event'])
  public onDocumentDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('document:drop', ['$event'])
  public onDocumentDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }
  handleFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
  }

  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    for (let i = 0; i < fileList.length; i++) {
      this.selectedFiles.push(fileList.item(i));
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  uploadFiles(): void {
    if (this.selectedFiles.length === 0) {
      return;
    }

    const filesFormData = new FormData();
    for (let i = 0; i < this.selectedFiles.length; i++) {
      filesFormData.append('files', this.selectedFiles[i]);
    }

    this.demandeService.addDocumentsToDemand(this.data.demandId, filesFormData).subscribe(
      (updatedDemand: Demand) => {
        console.log('Documents added to demande:', updatedDemand);
        this.dialogRef.close(true); // Close the modal after successful upload
      },
      (error) => {
        console.error('Error adding documents to demande:', error);
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
