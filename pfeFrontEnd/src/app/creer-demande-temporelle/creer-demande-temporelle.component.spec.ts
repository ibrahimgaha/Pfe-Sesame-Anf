import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerDemandeTemporelleComponent } from './creer-demande-temporelle.component';

describe('CreerDemandeTemporelleComponent', () => {
  let component: CreerDemandeTemporelleComponent;
  let fixture: ComponentFixture<CreerDemandeTemporelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerDemandeTemporelleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerDemandeTemporelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
