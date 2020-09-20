import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UpdateInfoService {

  constructor(private http : HttpClient) { }

  updateUserInfo(user : User): Observable<User> {
    console.log("::::::::IN LOGIN SERVICE:::::::::::");
    //Test user to avoid typing over and over again
    // user.username = "betty1";
    // user.password = "destroyah";
    let jsonUser : string = JSON.stringify(user);
    console.log(jsonUser);
    return this.http.put("http://localhost:8090/food/updateInfo/", jsonUser, {

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
