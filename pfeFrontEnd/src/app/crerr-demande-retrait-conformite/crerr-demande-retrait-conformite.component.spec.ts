import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrerrDemandeRetraitConformiteComponent } from './crerr-demande-retrait-conformite.component';

describe('CrerrDemandeRetraitConformiteComponent', () => {
  let component: CrerrDemandeRetraitConformiteComponent;
  let fixture: ComponentFixture<CrerrDemandeRetraitConformiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrerrDemandeRetraitConformiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrerrDemandeRetraitConformiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
