import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerAvisTechUserComponent } from './lister-avis-tech-user.component';

describe('ListerAvisTechUserComponent', () => {
  let component: ListerAvisTechUserComponent;
  let fixture: ComponentFixture<ListerAvisTechUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerAvisTechUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerAvisTechUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
