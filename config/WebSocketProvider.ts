import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: any;

  constructor() {
    this.socket = io.connect('http://localhost:8080/chats');
  }

  public sendMessage(message: any) {
    this.socket.emit('sendMessage', message);
  }

  public getMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('receiveMessage', (message: any) => {
        observer.next(message);
      });
    });
  }
}