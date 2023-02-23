import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChatComponent } from './Chat/chat.component';
import { DocumentComponent } from './Document/document.component';
import { LoginComponent } from './Login/login.component';
import { MainComponent } from './main/main.component';
import { UpdateComponent } from './Update/update.component';
import { WriteComponent } from './Write/write.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent},
  {path: 'document', component: DocumentComponent },
  {path: 'write', component: WriteComponent },
  {path: 'chat', component: ChatComponent},
  {path: 'update', component: UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




