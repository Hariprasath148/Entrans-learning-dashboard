import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-input',
  standalone: false,
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.css',
})
export class MessageInputComponent implements OnInit {
  @Input() messageInput: string = '';
  @Output() messageInputChange = new EventEmitter<string>();
  @Output() sendMessage = new EventEmitter<void>();

  ngOnInit() {}

  /**
   * onInputChange - Update the message input value
   * @param event - Input event
   */
  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.messageInput = target.value;
    this.messageInputChange.emit(this.messageInput);
  }

  /**
   * onSendClick - Emit send message event
   */
  onSendClick() {
    if (this.messageInput.trim()) {
      this.sendMessage.emit();
    }
  }

  /**
   * onKeyDown - Send message on Enter key
   * @param event - Keyboard event
   */
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSendClick();
    }
  }
}