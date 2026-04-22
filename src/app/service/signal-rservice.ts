import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BaseUrl } from './constant';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private baseUrl = `${BaseUrl}`;
  constructor(private http: HttpClient) {}

  // 🔹 API calls
  getChatUsers() {
    return this.http.get<number[]>(`${this.baseUrl}/chat/users`);
  }

  getMessages(user2: number) {
    return this.http.get<any[]>(`${this.baseUrl}/chat/messages/${user2}`);
  }

  startConnection(userId: number) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.baseUrl}/chatHub`)
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
