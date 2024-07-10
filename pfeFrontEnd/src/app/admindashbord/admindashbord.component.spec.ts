import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindashbordComponent } from './admindashbord.component';

describe('AdmindashbordComponent', () => {
  let component: AdmindashbordComponent;
  let fixture: ComponentFixture<AdmindashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmindashbordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
