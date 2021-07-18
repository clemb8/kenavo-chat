import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PseudModalComponent } from './pseudo-modal.component';

describe('PseudModalComponent', () => {
  let component: PseudModalComponent;
  let fixture: ComponentFixture<PseudModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PseudModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PseudModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
