import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerDemandeHomologationComponent } from './creer-demande-homologation.component';

describe('CreerDemandeHomologationComponent', () => {
  let component: CreerDemandeHomologationComponent;
  let fixture: ComponentFixture<CreerDemandeHomologationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerDemandeHomologationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerDemandeHomologationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
