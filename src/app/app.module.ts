import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login.component';
import { MainComponent } from './main/main.component';
import { WriteComponent } from './Write/write.component';
import { UpdateComponent } from './Update/update.component';
import { ChatComponent } from './Chat/chat.component';
import { WebSocketService } from 'config/WebSocketProvider';
import { TokenService } from './Login/token.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    WriteComponent,
    UpdateComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [WebSocketService, TokenService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
