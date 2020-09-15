import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  /* 
  Login service will have two fields, although it really only needs one
  1. the serviceUsername 
  2. and the user field 
  */
  serviceUsername : string;
  serviceUser : User;

  constructor(private http : HttpClient) { }

  public login(user :User) : Observable<User> {
    console.log("::::::::IN LOGIN SERVICE:::::::::::");
    //Test user to avoid typing over and over again
    // user.username = "betty1";
    // user.password = "destroyah";
    let jsonUser : string = JSON.stringify(user);
    return this.http.post("http://localhost:8080/JenkinsRepo/login", jsonUser, {

      headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      },
      withCredentials : true,
      responseType : "json"
    }) as Observable<User>;
  }
}
