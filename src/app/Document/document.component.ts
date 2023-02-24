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
       const { data } =  await axios.post("http://172.30.1.46:8080/article", {title: this.dumTitle}, {headers});
       //줄 바꿈 적용 성공 로직 입력해서 줄바꿈 인식해서 <br> 태그 입력후 여기서 replace 그리고 innerHtml 띄워서 적용 성공
       this.article1 = data.article.article1.replace(/<br>/g, '<br>');
       this.article2 = data.article.article2.replace(/<br>/g, '<br>');
       this.article3 = data.article.article3.replace(/<br>/g, '<br>');
       this.article4 = data.article.article4.replace(/<br>/g, '<br>');
       this.article5 = data.article.article5.replace(/<br>/g, '<br>');
       this.article6 = data.article.article6.replace(/<br>/g, '<br>');
      
       this.oneTitle = data.article.onetitle;
       this.twoTitle = data.article.twotitle;
       this.threeTitle = data.article.threetitle;
       this.fourTitle = data.article.fourtitle;
       this.fiveTitle = data.article.fivetitle;
       this.sixTitle = data.article.sixtitle;
       
       this.imageUrl = "http://172.30.1.46:8080/" + data.imagePath;
       this.fileUrl = "http://172.30.1.46:8080/" + data.filePath;

       
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
        await axios.post("http://172.30.1.46:8080/article/delete", { title: this.dumTitle});
     }catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          const { data } = e.response;
          if (data) {
            alert("게시글을 삭제하기 위해서는 권한 3 이상의 관리자여야 합니다.");
          }
        }
      }
      this.router.navigate(['/main'])
    }
  
 }



