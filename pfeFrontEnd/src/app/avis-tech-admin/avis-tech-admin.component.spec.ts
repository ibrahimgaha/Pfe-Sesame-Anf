import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisTechAdminComponent } from './avis-tech-admin.component';

describe('AvisTechAdminComponent', () => {
  let component: AvisTechAdminComponent;
  let fixture: ComponentFixture<AvisTechAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisTechAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisTechAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
