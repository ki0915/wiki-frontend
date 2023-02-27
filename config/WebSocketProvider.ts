import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: any;

  constructor() {
    // socket 객체를 생성하고, 서버와 연결합니다.
    this.socket = io.connect('ws://172.30.1.46:8080/chats');

    // "receiveMessage" 이벤트 리스너를 등록합니다.
    this.socket.on("receiveMessage", (data: any) => {

    });
  }

  public joinRoom(chatTitle: string) {
      this.socket.emit('joinRoom', chatTitle);
  }

  public sendMessage(message: any) {
    this.socket.emit('sendMessage', message);
  }

  getMessage(roomTitle: string): Observable<any> {
    return new Observable(observer => {
      // "receiveMessage" 이벤트 리스너를 등록합니다.
      this.socket.on('receiveMessage', (data: any) => {
        observer.next(data);
      });
    });
  }
}