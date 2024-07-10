import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirProfileComponent } from './voir-profile.component';

describe('VoirProfileComponent', () => {
  let component: VoirProfileComponent;
  let fixture: ComponentFixture<VoirProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoirProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
