import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../_services/demande.service';
import { Demand } from '../_model/demand.model';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadModalComponent } from '../file-upload-modal/file-upload-modal.component';
import { DemandeStatus } from '../_model/demandStatus.model';

@Component({
  selector: 'app-demand-user-liste',
  templateUrl: './demand-user-liste.component.html',
  styleUrls: ['./demand-user-liste.component.css']
})
export class DemandUserListeComponent implements OnInit {
  filterOption: string;
  searchQuery: DemandeStatus; // Initialize the searchQuery property

  demands: Demand[] = [];
  filteredDemands: Demand[] = [];
  selectedType: string;

  types: string[] = ['Homologation', 'Conformité', 'RetraitDeLaConformité'];

  constructor(private demandeService: DemandeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log('Component initialized'); // Logging component initialization
    this.fetchDemandsForCurrentUser();
  }

  fetchDemandsForCurrentUser(): void {
    this.demandeService.getDemandeCurrentUser().subscribe(
      (data: Demand[]) => {
        this.demands = data;
        this.applyFilter();
        console.log('Demands fetched:', this.demands); // Logging fetched demands
      },
      (error) => {
        console.error('Error fetching demands:', error);
      }
    );
  }

  applyFilter(): void {
    console.log('Filtering with option:', this.filterOption); // Logging filter option
    if (this.filterOption === 'status') {
      // Assuming you have a selected status in this.searchQuery
      this.demandeService.filterByStatus(this.searchQuery).subscribe(
        (data: Demand[]) => {
          this.filteredDemands = data;
        },
        (error) => {
          console.error('Error filtering demands by status:', error);
        }
      );
    } else {
      this.filteredDemands = this.demands; // If no filter applied, display all demands
    }
  }

  applyFilterByType(): void {
    console.log('Filtering by type:', this.selectedType); // Logging selected type
    if (this.filterOption === 'type' && this.selectedType) {
      this.demandeService.filterByType(this.selectedType).subscribe(
        (data: Demand[]) => {
          this.filteredDemands = data;
        },
        (error) => {
          console.error('Error filtering demands by type:', error);
        }
      );
    } else {
      this.filteredDemands = this.demands; // If no filter applied or no type selected, display all demands
    }
  }

  openFileUploadModal(id: number): void {
    const dialogRef = this.dialog.open(FileUploadModalComponent, {
      width: '400px',
      data: { demandId: id }
    });
  }

  updateComplements(id: number): void {
    const filesFormData = new FormData();

    this.demandeService.addDocumentsToDemand(id, filesFormData).subscribe(
      (updatedDemand: Demand) => {
        console.log('Documents added to demande:', updatedDemand);
      },
      (error) => {
        console.error('Error adding documents to demande:', error);
      }
    );
  }
}
