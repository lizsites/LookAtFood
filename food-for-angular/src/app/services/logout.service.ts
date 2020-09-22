import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http : HttpClient) { }
  
  public logoutFunc() : Observable<any>
  {
   return this.http.post("http://localhost:8090/food/log_out/",{
    headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      },
      withCredentials : true,
      responseType : "json"
   }) as Observable<any>;
  }
}
