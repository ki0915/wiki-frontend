import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import axios from "axios";

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

  constructor(private router:Router) { }

  
  loginProcess = async () => {
    try {
      await axios.post("http://localhost:8080/login", { id: this.loginId, password: this.loginPw });
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
          await axios.post("http://localhost:8080/signUp", { id: this.signUpId, password: this.signUpPw });
        }
        catch (e) {
          if (axios.isAxiosError(e) && e.response) {
            const { data } = e.response;
            if (data) {
              alert(data.message);
            }
          }
        }

  };

}
