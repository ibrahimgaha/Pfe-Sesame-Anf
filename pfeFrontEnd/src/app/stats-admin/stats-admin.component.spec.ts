import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsAdminComponent } from './stats-admin.component';

describe('StatsAdminComponent', () => {
  let component: StatsAdminComponent;
  let fixture: ComponentFixture<StatsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
