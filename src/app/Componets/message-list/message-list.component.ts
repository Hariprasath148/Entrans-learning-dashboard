import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../chat-page/chat-page.component';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent implements OnChanges {
  @Input() messages: Message[] = [];
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  ngOnChanges(changes: SimpleChanges) {
    /* Auto-scroll to bottom when messages change */
    if (changes['messages']) {
      setTimeout(() => {
        this.scrollToBottom();
      });
    }
  }

  /**
   * scrollToBottom - Scroll the messages container to the bottom
   */
  scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    }
  }
}