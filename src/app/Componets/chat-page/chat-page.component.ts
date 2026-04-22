import { ChangeDetectorRef, Component } from '@angular/core';
import { SignalRService } from '../../service/signal-rservice';
import { Auth } from '../../service/auth';

export interface User {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  status: 'online' | 'offline';
}

export interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
  isSent: boolean;
}

@Component({
  selector: 'app-chat-page',
  standalone: false,
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css',
})
export class ChatPageComponent {

  /* Dummy users list */
  users: any[] = [];

  /* Chat messages for the selected user */
  messages: any[] = [];

  senderId = 1;
  receiverId = 2;

  /* State */
  selectedUser: any | null = null;
  searchText: string = '';
  messageInput: string = '';
  isSidebarOpen: boolean = true;

  constructor(private cd: ChangeDetectorRef,private signalR: SignalRService , private authService : Auth) {}

  ngOnInit() {
    /* Select the first user by default */
    this.selectedUser = this.users[0];
    this.senderId = this.authService.getUser().id;
    this.signalR.startConnection(this.senderId);
    this.signalR.receiveMessage((senderId: number, message: string) => {
      console.log("hi")
      this.messages.push({
        id: 6,
        senderId: senderId,
        text: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isSent: false,
      });
      setTimeout(() => {
      const chatContainer = document.querySelector('.messages-container');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      });
      this.cd.detectChanges();
    });
    this.signalR.getChatUsers().subscribe((chats)=> {
      this.users = chats;
    });
  }

  /**
   * selectUser - Set the selected user and update the chat
   * @param user - User to select
   */
  selectUser(user:any) {
    this.selectedUser = user;
    this.receiverId = user.id;
    this.updateMessagesForUser(user.id);
    this.cd.detectChanges();
  }

  /**
   * updateMessagesForUser - Update messages based on selected user
   * @param userId - ID of the selected user
   */
  updateMessagesForUser(userId: number) {
    this.signalR.getMessages(userId).subscribe((chats)=> {
      this.messages = chats;
      this.cd.detectChanges();
    });
  }

  /**
   * filteredUsers - Get filtered users based on search text
   */
  get filteredUsers(): User[] {
    if (!this.searchText.trim()) {
      return this.users;
    }
    return this.users.filter((user) =>
      user.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  /**
   * sendMessage - Send a new message
   */
  sendMessage() {
    if (!this.messageInput.trim() || !this.selectedUser) {
      return;
    }
    
    this.signalR.sendMessage(this.senderId,this.receiverId,this.messageInput);

    const newMessage: Message = {
      id: this.messages.length + 1,
      senderId: this.senderId,
      text:  this.messageInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isSent: true 
    };

    this.messages.push(newMessage);

    //this.messages.push(newMessage);
    this.messageInput = '';

    /* Auto-scroll to bottom */
    setTimeout(() => {
      const chatContainer = document.querySelector('.messages-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    });

    this.cd.detectChanges();
  }

  /**
   * toggleSidebar - Toggle the sidebar visibility on smaller screens
   */
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  /**
   * clearSearch - Clear the search input
   */
  clearSearch() {
    this.searchText = '';
    this.cd.detectChanges();
  }

  /**
   * onSearchChange - Handle search text change
   */
  onSearchChange(text: string) {
    this.searchText = text;
  }
}