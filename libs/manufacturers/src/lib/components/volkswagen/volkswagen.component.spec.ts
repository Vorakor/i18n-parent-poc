import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolkswagenComponent } from './volkswagen.component';

describe('VolkswagenComponent', () => {
  let component: VolkswagenComponent;
  let fixture: ComponentFixture<VolkswagenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolkswagenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolkswagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
