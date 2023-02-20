import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public token: string = '';
  public name: string = '';
  constructor() { }
}