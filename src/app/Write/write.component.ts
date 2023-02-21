import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { TokenService } from "../Login/token.service";

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

  private _onetitle = '';
  private _twotitle = '';
  private _threetitle= '';
  private _fourtitle = '';
  private _fivetitle= '';
  private _sixtitle = '';

  selectedFile? : File;
  selectedImage?: Blob;

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


  get onetitle(): string {
    return this._onetitle;
  }


  set onetitle(v: string) {
    this._onetitle = v;
  }


  get twotitle(): string {
    return this._twotitle;
  }


  set twotitle(v: string) {
    this._twotitle = v;
  }

  get threetitle(): string {
    return this._threetitle;
  }


  set threetitle(v: string) {
    this._threetitle = v;
  }


  get fourtitle(): string {
    return this._fourtitle;
  }

  set fourtitle(v: string){
    this._fourtitle = v;
  }


  set fivetitle(v: string) {
    this._fivetitle = v;
  }


  get fivetitle(): string {
    return this._fivetitle;
  }

  set sixtitle(v: string) {
    this._sixtitle = v;
  }


  get sixtitle(): string {
    return this._sixtitle;
  }

  onFlleSelected(event: any): void {
    this.selectedFile = event.target.files[0];

  }


  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];

  }

  

  writeProcess = async () => {
    try {
      const token = this.tokenService.token;
      const headers = { 'x-auth-token': token, 'Content-Type': 'multipart/form-data',};

      
      const formData = new FormData();
      

      if (this.selectedFile && Blob.prototype.isPrototypeOf(this.selectedFile)) {
        formData.append('file', this.selectedFile, this.selectedFile.name);
        console.log("성공");
      } else {
        console.error('파일이 선택되지 않음.');
      }

      if (this.selectedImage instanceof File) {
        formData.append('image', this.selectedImage, this.selectedImage.name);
        console.log("성공");
      } else {
        console.error('이미지가 선택되지 않음.');
      }
      
      formData.append('title', this.title);
      formData.append('article1', this.article1);
      formData.append('article2', this.article2);
      formData.append('article3', this.article3);
      formData.append('article4', this.article4);
      formData.append('article5', this.article5);
      formData.append('article6', this.article6);

      formData.append('onetitle', this.onetitle);
      formData.append('twotitle', this.twotitle);
      formData.append('threetitle', this.threetitle);
      formData.append('fourtitle', this.fourtitle);
      formData.append('fivetitle', this.fivetitle);
      formData.append('sixtitle', this.sixtitle);
      

      const body = { file: formData, };
     
      await axios.post("http://localhost:8080/article/post", formData, {headers} );
   }catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const { data } = e.response;
        if (data) {
          alert("싪패");
        }
      }
    }
    this.router.navigate(['/main'])
  }

      
    constructor(private router:Router, private tokenService: TokenService,) { }
    backProcess (): void {
        this.router.navigate(['/main'])
    }
  
 }


