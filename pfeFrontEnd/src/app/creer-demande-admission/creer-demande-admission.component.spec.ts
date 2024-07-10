import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerDemandeAdmissionComponent } from './creer-demande-admission.component';

describe('CreerDemandeAdmissionComponent', () => {
  let component: CreerDemandeAdmissionComponent;
  let fixture: ComponentFixture<CreerDemandeAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerDemandeAdmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerDemandeAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
