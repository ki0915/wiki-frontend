import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebSocketService } from 'config/WebSocketProvider';
import { TokenService } from '../Login/token.service';
import { chats } from './chat.model';
import axios from 'axios';

@Component({
  selector: 'chat-com',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  public userId = '';
  dumTitle = '';
  inputChat = '';
  chatData: chats[] = [];

  private chatSubscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private wsService: WebSocketService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.userId = this.tokenService.name;
    this.route.queryParams.subscribe((params) => {
      this.dumTitle = params['title'];
      this.ReadProcess();
    });
    
    this.wsService.joinRoom(this.dumTitle);

    this.chatSubscription = this.wsService.getMessage(this.dumTitle).subscribe((message: any) => {
      if (message.roomTitle === this.dumTitle) {
        this.chatData.push(message);
      }
    });
  }

  ngOnDestroy() {
    this.chatSubscription.unsubscribe();
  }

  async ReadProcess(): Promise<void> {
    const token = this.tokenService.token;
    const headers = { 'x-auth-token': token };
    const { data } = await axios.post<chats[]>(
      'http://172.30.1.46:8080/chats/view',
      { roomTitle: this.dumTitle },
      { headers }
    );
    this.chatData = data;
  }

  async WriteProcess(): Promise<void> {
    try {
      this.wsService.sendMessage({
        roomTitle: this.dumTitle,
        senderId: this.tokenService.name,
        message: this.inputChat
      });
      this.inputChat = '';
    } catch (e) {}
  }

  BackProcess(): void {
    this.router.navigate(['/main']);
  }
}