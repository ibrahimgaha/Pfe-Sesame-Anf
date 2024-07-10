import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDashboardComponent } from './menu-dashboard.component';

describe('MenuDashboardComponent', () => {
  let component: MenuDashboardComponent;
  let fixture: ComponentFixture<MenuDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
