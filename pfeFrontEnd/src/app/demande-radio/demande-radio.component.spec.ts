import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeRadioComponent } from './demande-radio.component';

describe('DemandeRadioComponent', () => {
  let component: DemandeRadioComponent;
  let fixture: ComponentFixture<DemandeRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
