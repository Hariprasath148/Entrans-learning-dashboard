import { Component, Input } from '@angular/core';
// import { User } from '../chat-page/chat-page.component';

@Component({
  selector: 'app-chat-header',
  standalone: false,
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.css',
})
export class ChatHeaderComponent {
  @Input() user: any | null = null;
}