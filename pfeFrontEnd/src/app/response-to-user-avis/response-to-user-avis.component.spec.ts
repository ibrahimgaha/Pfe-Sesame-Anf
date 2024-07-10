import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseToUserAvisComponent } from './response-to-user-avis.component';

describe('ResponseToUserAvisComponent', () => {
  let component: ResponseToUserAvisComponent;
  let fixture: ComponentFixture<ResponseToUserAvisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseToUserAvisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseToUserAvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
