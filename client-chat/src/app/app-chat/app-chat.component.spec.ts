import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppChatComponent } from './app-chat.component';

describe('AppChatComponent', () => {
  let component: AppChatComponent;
  let fixture: ComponentFixture<AppChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
