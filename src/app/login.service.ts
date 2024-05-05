import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  http = inject(HttpClient)

  onLoginAuthentication(obj:any): Observable<Response>{
    return this.http.post<Response>('https://fakestoreapi.com/auth/login', obj)
  }

  addUser(obj: Object){
    return this.http.post<Response>('https://fakestoreapi.com/users',obj)
  }
}
