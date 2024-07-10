import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDemandsComponent } from './choose-demands.component';

describe('ChooseDemandsComponent', () => {
  let component: ChooseDemandsComponent;
  let fixture: ComponentFixture<ChooseDemandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseDemandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseDemandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
