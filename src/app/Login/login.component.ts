import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import axios from "axios";
import { TokenService } from './token.service';

@Component({
  selector: 'login-com',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  private _loginId = '';
  private _loginPw = '';

  private _signUpId = '';
  private _signUpPw = '';

get signUpId(): string {
    return this._signUpId;
}

get signUpPw(): string {
  return this._signUpPw;
}

 set signUpId(v: string) {
  this._signUpId = v;
  console.log(v);
}

set signUpPw(v: string) {
  this._signUpPw = v;
}

  get loginId(): string {
      return this._loginId;
  }

  get loginPw(): string {
    return this._loginPw;
}

   set loginId(v: string) {
    this._loginId = v;
    console.log(v);
  }


  set loginPw(v: string) {
    this._loginPw = v;
  }

  constructor(private router:Router, private tokenService: TokenService) { }

  
  loginProcess = async () => {
    try {
      const hashLoginPw = CryptoJS.SHA256(this.loginPw).toString();
      const response = await axios.post("http://172.30.1.58:8080/login", { id: this.loginId, password: hashLoginPw });
      this.tokenService.token = response.data.token;
      this.tokenService.name = this.loginId;
      this.router.navigate(['/main'])
   }catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const { data } = e.response;
        if (data) {
          alert(data.message);
        }
      }
    }

  }


  showSignin = true;
  showSignup = false;

  onSignIn() {
    this.showSignin = true;
    this.showSignup = false;
  }

  onSignUp() {
    this.showSignin = false;
    this.showSignup = true;
 }


  async signUpProcess (): Promise<void>{
        alert(this.signUpPw);
        try {
          const hashSignUpPw = CryptoJS.SHA256(this.signUpPw).toString();
          await axios.post("http://172.30.1.58:8080/signUp", { id: this.signUpId, password: hashSignUpPw });
        }
        catch (e) {
          if (axios.isAxiosError(e) && e.response) {
            const { data } = e.response;
            if (data) {
              alert(data.message);
              alert("비밀번호나 아이디 둘 중 하나가 너무 깁니다. 다시 시도해주세요.");
            }
          }
        }

  };

}
