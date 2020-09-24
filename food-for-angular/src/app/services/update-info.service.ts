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
    let jsonUser : string = JSON.stringify(user);
    console.log(jsonUser);
    return this.http.put("http://ec2-18-218-228-24.us-east-2.compute.amazonaws.com:8090/food/updateInfo/", jsonUser, {

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
