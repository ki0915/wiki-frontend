import { Component, ElementRef, ViewChild, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { chats } from './chat.model';
import { WebSocketService } from 'config/WebSocketProvider';
import { Subscription } from 'rxjs';
import { TokenService } from '../Login/token.service';

@Component({
  selector: 'chat-com',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent {
  
  public userId = " ";;
  dumTitle = '';

  
  private _inputChat = '';

  chatData : chats[] = [];


  get inputChat(): string {
    return this._inputChat;
  }
  
   set inputChat(v: string) {
    this._inputChat = v;

    this.ReadProcess();
  }

  private chatSubscription!: Subscription;


  constructor(private router:Router, private route: ActivatedRoute, private wsService: WebSocketService, private tokenService: TokenService) {  }

  async ReadProcess (): Promise<void> {
      this.route.queryParams.subscribe(params => {
        this.dumTitle = params['title'];
      });     

      const token = this.tokenService.token;
      const headers = { 'x-auth-token': token };
      const { data } = await axios.post<chats[]>(
        'http://172.30.1.58:8080/chats/view',   {
            roomTitle : this.dumTitle }, { headers }
      );
    
      this.chatData = data;

}


  async WriteProcess (): Promise<void> {
    try{
      this.wsService.sendMessage({roomTitle: this.dumTitle, senderId: this.tokenService.name, message: this.inputChat});
      this.ReadProcess();
    } catch(e){

    }
  }
  
  BackProcess () : void {
    this.router.navigate(['/main']);
  }

  ngOnInit() {
    this.userId = this.tokenService.name;
    this.ReadProcess();
    this.wsService.joinRoom(this.dumTitle);

    this.chatSubscription = this.wsService.getMessage().subscribe((message: chats) => {
      if (message.roomTitle === this.dumTitle) {
        this.chatData.push(message);
      }
    });

  }



 }