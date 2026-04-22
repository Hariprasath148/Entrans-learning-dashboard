import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  constructor(private http: HttpClient) {}

  // 🔹 API calls
  getChatUsers(userId: number) {
    return this.http.get<number[]>(`http://localhost:5000/api/chat/users/${userId}`);
  }

  getMessages(user1: number, user2: number) {
    return this.http.get<any[]>(`http://localhost:5000/api/chat/messages?user1=${user1}&user2=${user2}`);
  }

  startConnection(userId: number) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5058/chatHub')
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .then(() => {
        console.log('Connected');
        this.hubConnection.invoke('RegisterUser', userId);
      });
  }

  receiveMessage(callback: any) {
    this.hubConnection.on('ReceivePrivateMessage', callback);
  }

  sendMessage(senderId: number, receiverId: number, message: string) {
    this.hubConnection.invoke('SendPrivateMessage', senderId, receiverId, message);
  }
}
