import { Component, ElementRef, ViewChild } from '@angular/core';
import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../Login/token.service';

@Component({
  selector: 'update-com',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})

export class UpdateComponent {

  dumTitle = '';
  private _title = '';
  private _article1 = '';
  private _article2 = '';
  private _article3 = '';
  private _article4 = '';
  private _article5 = '';
  private _article6 = '';

  get title(): string {
    return this._title;
  }

  get article1(): string {
    return this._article1;
  }

  get article2(): string {
    return this._article2;
  }

  get article3(): string {
    return this._article3;
  }

  get article4(): string {
    return this._article4;
  }

  get article5(): string {
    return this._article5;
  }

  get article6(): string {
    return this._article6;
  }

  set title(v: string) {
    this._title = v;
    console.log(v);
  }

  set article1(v: string) {
    this._article1 = v;
  }

  set article2(v: string) {
    this._article2 = v;
  }

  set article3(v: string) {
    this._article3 = v;
  }


  set article4(v: string) {
    this._article4 = v;
  }

  set article5(v: string) {
    this._article5 = v;
  }
   
  set article6(v: string) {
    this._article6 = v;
  }


  upDateProcess = async () => {
    try {
      await axios.post("http://172.30.1.46:8080/article/update", { title: this.dumTitle, article1: this.article1, article2: this.article2, article3: this.article3, article4: this.article4, article5: this.article5, article6: this.article6 });
   }catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const { data } = e.response;
        if (data) {
          alert("실패하였습니다.");
        }
      }
    }
    this.router.navigate(['/main'])
  }


  async ReadProcess (): Promise<void> {
    try {
      this.route.queryParams.subscribe(params => {
        this.dumTitle = params['title'];
      });
      const token = this.tokenService.token;
      const headers = { 'x-auth-token': token };
     const { data } =  await axios.post("http://172.30.1.46:8080/article", {title: this.dumTitle}, {headers});
     this.article1 = data.article1;
     this.article2 = data.article2;
     this.article3 = data.article3;
     this.article4 = data.article4;
     this.article5 = data.article5;
     this.article6 = data.article6;
     
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      const { data } = e.response;
      if (data) {
        alert(data.message);
      }
    }
  }
}

      
    constructor(private router:Router, private route: ActivatedRoute, private tokenService: TokenService,) { this.ReadProcess(); }
    backProcess (): void {
        this.router.navigate(['/main'])
    }
  
 }


