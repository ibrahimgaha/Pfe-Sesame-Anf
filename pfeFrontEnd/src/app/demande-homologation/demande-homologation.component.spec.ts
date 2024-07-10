import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeHomologationComponent } from './demande-homologation.component';

describe('DemandeHomologationComponent', () => {
  let component: DemandeHomologationComponent;
  let fixture: ComponentFixture<DemandeHomologationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeHomologationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeHomologationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
