import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  http = inject(HttpClient)

  onLoginAuthentication(obj:any){
    return this.http.post('https://fakestoreapi.com/auth/login',obj)
  }
}
