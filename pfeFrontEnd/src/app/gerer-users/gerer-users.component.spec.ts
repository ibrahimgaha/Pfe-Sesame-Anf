import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererUsersComponent } from './gerer-users.component';

describe('GererUsersComponent', () => {
  let component: GererUsersComponent;
  let fixture: ComponentFixture<GererUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GererUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
