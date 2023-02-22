import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { article } from './article.model';
import { TokenService } from "../Login/token.service";

@Component({
  selector: 'document-com',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})

export class DocumentComponent {
 
   dumTitle = '';
   title = '';
   article1 ='';
   article2 = '';
   article3 ='';
   article4 ='';
   article5 = '';
   article6 ='';

   oneTitle = '';
   twoTitle = '';
   threeTitle = '';
   fourTitle = '';
   fiveTitle = '';
   sixTitle = '';

   fileUrl = '';
   imageUrl ='';
  
   async ReadProcess (): Promise<void> {
      try {
        this.route.queryParams.subscribe(params => {
          this.dumTitle = params['title'];
        });
        const token = this.tokenService.token;
        const headers = { 'x-auth-token': token };
       const { data } =  await axios.post("http://localhost:8080/article", {title: this.dumTitle}, {headers});
       this.article1 = data.article.article1;
       this.article2 = data.article.article2;
       this.article3 = data.article.article3;
       this.article4 = data.article.article4;
       this.article5 = data.article.article5;
       this.article6 = data.article.article6;
      
       this.oneTitle = data.article.onetitle;
       this.twoTitle = data.article.twotitle;
       this.threeTitle = data.article.threetitle;
       this.fourTitle = data.article.fourtitle;
       this.fiveTitle = data.article.fivetitle;
       this.sixTitle = data.article.sixtitle;
       
       this.imageUrl = "http://localhost:8080/" + data.imagePath;
       this.fileUrl = "http://localhost:8080/" + data.filePath;

       alert(this.imageUrl);
       
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const { data } = e.response;
        if (data) {
          console.log(data.message);
        }
      }
    }
  }

      
    constructor(private router:Router, private route: ActivatedRoute, private tokenService: TokenService) { this.ReadProcess(); }


    UpdateProcess () : void {
      this.router.navigate(['/update'], { queryParams: { title: this.dumTitle } });
    }
   
    BackProcess () : void {
      this.router.navigate(['/main']);
    }



    deleteProcess = async () => {
      try {
        await axios.post("http://localhost:8080/article/delete", { title: this.dumTitle});
     }catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          const { data } = e.response;
          if (data) {
            alert(data.message);
          }
        }
      }
      this.router.navigate(['/main'])
    }
  
 }



