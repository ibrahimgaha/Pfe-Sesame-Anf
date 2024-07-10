import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeRetraitConformiteComponent } from './demande-retrait-conformite.component';

describe('DemandeRetraitConformiteComponent', () => {
  let component: DemandeRetraitConformiteComponent;
  let fixture: ComponentFixture<DemandeRetraitConformiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeRetraitConformiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeRetraitConformiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
