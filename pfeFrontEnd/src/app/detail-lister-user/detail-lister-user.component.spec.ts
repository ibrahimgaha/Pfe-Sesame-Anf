import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailListerUserComponent } from './detail-lister-user.component';

describe('DetailListerUserComponent', () => {
  let component: DetailListerUserComponent;
  let fixture: ComponentFixture<DetailListerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailListerUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailListerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
