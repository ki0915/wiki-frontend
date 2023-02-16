import { Component, ElementRef, ViewChild, OnChanges, SimpleChanges  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { chats } from './chat.model';
import { WebSocketService } from 'config/WebSocketProvider';

@Component({
  selector: 'chat-com',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  
  userId = '기민수';
  dumTitle = '';
  private _inputChat = '';

  chatData : chats[] = [];

  get inputChat(): string {
    return this._inputChat;
  }
  
   set inputChat(v: string) {
    this._inputChat = v;
  }


  constructor(private router:Router, private route: ActivatedRoute, private wsService: WebSocketService) { this.ReadProcess(); }

  async ReadProcess (): Promise<void> {


      this.route.queryParams.subscribe(params => {
        this.dumTitle = params['title'];
      });     

      const { data } = await axios.post<chats[]>(
        'http://localhost:8080/chats/view',   {
            roomTitle : this.dumTitle }
      );
    
      this.chatData = data;

}


  async WriteProcess (): Promise<void> {
    try{
      this.wsService.sendMessage({roomTitle: this.dumTitle, senderId: this.userId, message: this.inputChat});
    } catch(e){

    }
  }
  
  BackProcess () : void {
    this.router.navigate(['/main']);
  }

  public ngOnInit(): void {
    
  }
 }