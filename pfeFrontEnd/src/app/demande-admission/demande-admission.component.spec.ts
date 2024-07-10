import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeAdmissionComponent } from './demande-admission.component';

describe('DemandeAdmissionComponent', () => {
  let component: DemandeAdmissionComponent;
  let fixture: ComponentFixture<DemandeAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeAdmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
