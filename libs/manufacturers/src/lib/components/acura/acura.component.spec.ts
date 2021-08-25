import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcuraComponent } from './acura.component';

describe('AcuraComponent', () => {
  let component: AcuraComponent;
  let fixture: ComponentFixture<AcuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcuraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
