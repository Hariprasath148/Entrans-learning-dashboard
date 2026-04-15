import { ComponentFixture, TestBed } from '@angular/core/testing';
import { spyOn } from 'vitest';
import { MessageInputComponent } from './message-input.component';

describe('MessageInputComponent', () => {
  let component: MessageInputComponent;
  let fixture: ComponentFixture<MessageInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit messageInputChange on input', () => {
    spyOn(component.messageInputChange, 'emit');
    const input = document.createElement('input');
    input.value = 'test message';
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: input, enumerable: true });
    component.onInputChange(event);
    expect(component.messageInputChange.emit).toHaveBeenCalledWith('test message');
  });

  it('should emit sendMessage on send click', () => {
    spyOn(component.sendMessage, 'emit');
    component.messageInput = 'test message';
    component.onSendClick();
    expect(component.sendMessage.emit).toHaveBeenCalled();
  });

  it('should send message on Enter key', () => {
    spyOn(component.sendMessage, 'emit');
    component.messageInput = 'test message';
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    spyOn(event, 'preventDefault');
    component.onKeyDown(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.sendMessage.emit).toHaveBeenCalled();
  });

  it('should not send on Shift+Enter', () => {
    spyOn(component.sendMessage, 'emit');
    component.messageInput = 'test message';
    const event = new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true });
    component.onKeyDown(event);
    expect(component.sendMessage.emit).not.toHaveBeenCalled();
  });
});