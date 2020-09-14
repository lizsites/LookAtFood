import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http : HttpClient) { }
  
  public logoutFunc(u : User)
  {
    this.http.post("http://localhost:8080/JenkinsRepo/logout",{
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        },
        withCredentials : true,
        responseType : "json"
    });
  }
}
