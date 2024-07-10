import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisTechUserComponent } from './avis-tech-user.component';

describe('AvisTechUserComponent', () => {
  let component: AvisTechUserComponent;
  let fixture: ComponentFixture<AvisTechUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisTechUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisTechUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
