import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDemandComponent } from './modify-demand.component';

describe('ModifyDemandComponent', () => {
  let component: ModifyDemandComponent;
  let fixture: ComponentFixture<ModifyDemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyDemandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
