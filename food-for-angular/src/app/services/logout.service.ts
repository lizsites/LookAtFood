import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http : HttpClient) { }
  
  public logoutFunc(u : User) : Observable<any>
  {
   return this.http.post("http://localhost:8089/food/logout",{
  withCredentials : true
   }) as Observable<any>;
  }
}
