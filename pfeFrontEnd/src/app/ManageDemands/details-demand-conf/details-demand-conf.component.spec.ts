import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDemandConfComponent } from './details-demand-conf.component';

describe('DetailsDemandConfComponent', () => {
  let component: DetailsDemandConfComponent;
  let fixture: ComponentFixture<DetailsDemandConfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDemandConfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDemandConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
