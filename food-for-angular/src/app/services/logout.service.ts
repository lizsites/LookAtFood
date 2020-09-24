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
   return this.http.get("http://ec2-18-218-228-24.us-east-2.compute.amazonaws.com:8090/food/logout",{
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
