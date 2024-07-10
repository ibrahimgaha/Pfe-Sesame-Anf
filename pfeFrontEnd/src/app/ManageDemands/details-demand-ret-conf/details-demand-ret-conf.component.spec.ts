import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDemandRetConfComponent } from './details-demand-ret-conf.component';

describe('DetailsDemandRetConfComponent', () => {
  let component: DetailsDemandRetConfComponent;
  let fixture: ComponentFixture<DetailsDemandRetConfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDemandRetConfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDemandRetConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
