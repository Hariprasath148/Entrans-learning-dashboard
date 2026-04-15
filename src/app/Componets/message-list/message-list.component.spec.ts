import { ComponentFixture, TestBed } from '@angular/core/testing';
import { spyOn } from 'vitest';
import { MessageListComponent } from './message-list.component';

describe('MessageListComponent', () => {
  let component: MessageListComponent;
  let fixture: ComponentFixture<MessageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display messages', () => {
    component.messages = [
      { id: 1, senderId: 1, text: 'Hello', timestamp: '10:00', isSent: false },
      { id: 2, senderId: 0, text: 'Hi there', timestamp: '10:01', isSent: true }
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.message-bubble').length).toBe(2);
  });

  it('should auto-scroll to bottom on message update', () => {
    spyOn(component, 'scrollToBottom');
    component.messages = [
      { id: 1, senderId: 1, text: 'Hello', timestamp: '10:00', isSent: false }
    ];
    component.ngOnChanges({
      messages: { previousValue: [], currentValue: component.messages, firstChange: true, isFirstChange: () => true }
    });
    expect(component.scrollToBottom).toHaveBeenCalled();
  });
});