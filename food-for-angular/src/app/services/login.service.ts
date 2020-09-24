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
  2. and a user object with the name serviceUser.

  Now in the login component, we are setting our login service user, "serviceUser"
  to the data.

  Therefore, 
  any component that inject login service should also have access to
  the serviceUser field, and by extension the credentials of the user who has logged in.
  */
  serviceUsername : string;
  serviceUser : User;
  loggedIn : boolean;

  constructor(private http : HttpClient) { 
    this.loggedIn = false;
  }

  public login(user :User) : Observable<User> {
    console.log("::::::::IN LOGIN SERVICE:::::::::::");
    //Test user to avoid typing over and over again
    // user.username = "betty1";
    // user.password = "destroyah";
    let jsonUser : string = JSON.stringify(user);
    return this.http.post("http://ec2-18-218-228-24.us-east-2.compute.amazonaws.com:8090/food/login", jsonUser, {
      //withCredentials : true,
       headers : {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
      // //'Access-Control-Allow-Headers': 'Content-Type',
      // //'Access-Control-Allow-Origin': '*',
      },
      responseType : "json"
    }) as Observable<User>;
  }
}
