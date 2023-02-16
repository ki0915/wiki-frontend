import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'write-com',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent {

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


  writeProcess = async () => {
    try {
      await axios.post("http://localhost:8080/article/post", { title: this.title, article1: this.article1, article2: this.article2, article3: this.article3, article4: this.article4, article5: this.article5, article6: this.article6 });
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

      
    constructor(private router:Router) { }
    backProcess (): void {
        this.router.navigate(['/main'])
    }
  
 }


