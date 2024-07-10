import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandUserListeComponent } from './demand-user-liste.component';

describe('DemandUserListeComponent', () => {
  let component: DemandUserListeComponent;
  let fixture: ComponentFixture<DemandUserListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandUserListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandUserListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
