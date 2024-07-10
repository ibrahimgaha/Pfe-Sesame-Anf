import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAllDemandsComponent } from './add-all-demands.component';

describe('AddAllDemandsComponent', () => {
  let component: AddAllDemandsComponent;
  let fixture: ComponentFixture<AddAllDemandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAllDemandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAllDemandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
