import { ChangeDetectorRef, Component } from '@angular/core';

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
  users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      avatar: '👨🏻‍💼',
      lastMessage: 'Thanks for the update!',
      lastMessageTime: '2:30 PM',
      status: 'online',
    },
    {
      id: 2,
      name: 'Jane Smith',
      avatar: '👩🏻‍💼',
      lastMessage: 'See you tomorrow',
      lastMessageTime: '1:15 PM',
      status: 'offline',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      avatar: '👨🏻‍💻',
      lastMessage: 'Project looks great!',
      lastMessageTime: '12:45 PM',
      status: 'online',
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      avatar: '👩🏻‍🎤',
      lastMessage: 'Let me check that',
      lastMessageTime: '11:20 AM',
      status: 'offline',
    },
    {
      id: 5,
      name: 'Tom Brown',
      avatar: '👨🏻‍🎨',
      lastMessage: 'Sounds good to me',
      lastMessageTime: '10:05 AM',
      status: 'online',
    },
    {
      id: 6,
      name: 'Lisa Davis',
      avatar: '👩🏻‍⚕️',
      lastMessage: "Let's discuss this later",
      lastMessageTime: 'Yesterday',
      status: 'offline',
    },
    {
      id: 7,
      name: 'Alex Martin',
      avatar: '👨🏻‍⚖️',
      lastMessage: 'Perfect! Thanks',
      lastMessageTime: 'Yesterday',
      status: 'online',
    },
    {
      id: 8,
      name: 'Emma Taylor',
      avatar: '👩🏻‍🔬',
      lastMessage: 'I agree with that',
      lastMessageTime: '2 days ago',
      status: 'offline',
    },
  ];

  /* Chat messages for the selected user */
  messages: Message[] = [
    {
      id: 1,
      senderId: 1,
      text: 'Hi there! How are you?',
      timestamp: '10:30 AM',
      isSent: false,
    },
    {
      id: 2,
      senderId: 0,
      text: "Hey John! I'm doing great, thanks for asking!",
      timestamp: '10:35 AM',
      isSent: true,
    },
    {
      id: 3,
      senderId: 1,
      text: "That's awesome! Any updates on the project?",
      timestamp: '10:40 AM',
      isSent: false,
    },
    {
      id: 4,
      senderId: 0,
      text: 'Yes, I completed the first phase. Should be ready by tomorrow.',
      timestamp: '10:45 AM',
      isSent: true,
    },
    {
      id: 5,
      senderId: 1,
      text: 'Thanks for the update!',
      timestamp: '2:30 PM',
      isSent: false,
    },
  ];

  /* State */
  selectedUser: User | null = null;
  searchText: string = '';
  messageInput: string = '';
  isSidebarOpen: boolean = true;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    /* Select the first user by default */
    this.selectedUser = this.users[0];
  }

  /**
   * selectUser - Set the selected user and update the chat
   * @param user - User to select
   */
  selectUser(user: User) {
    this.selectedUser = user;
    this.updateMessagesForUser(user.id);
    this.cd.detectChanges();
  }

  /**
   * updateMessagesForUser - Update messages based on selected user
   * @param userId - ID of the selected user
   */
  updateMessagesForUser(userId: number) {
    /* In a real app, fetch messages from the backend */
    /* For now, keep existing messages */
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

    const newMessage: Message = {
      id: this.messages.length + 1,
      senderId: 0,
      text: this.messageInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isSent: true,
    };

    this.messages.push(newMessage);
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