import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  http = inject(HttpClient)

  apiServer = 'https://fakestoreapi.com'

  postUser(obj : any){
    return this.http.post(`${this.apiServer}/users`, obj)
  }

  getAllUser(){
    return this.http.get(`${this.apiServer}/users`)
  }
}
