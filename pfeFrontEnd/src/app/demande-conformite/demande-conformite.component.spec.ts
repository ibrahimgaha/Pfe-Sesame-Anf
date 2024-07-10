import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeConformiteComponent } from './demande-conformite.component';

describe('DemandeConformiteComponent', () => {
  let component: DemandeConformiteComponent;
  let fixture: ComponentFixture<DemandeConformiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeConformiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeConformiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
