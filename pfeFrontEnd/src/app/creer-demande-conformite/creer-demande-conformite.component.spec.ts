import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerDemandeConformiteComponent } from './creer-demande-conformite.component';

describe('CreerDemandeConformiteComponent', () => {
  let component: CreerDemandeConformiteComponent;
  let fixture: ComponentFixture<CreerDemandeConformiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerDemandeConformiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerDemandeConformiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
