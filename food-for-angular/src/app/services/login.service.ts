import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  public login(user :User) : User {
    
    return this.http.post("http://localhost:8080/JenkinsRepo/login", user) as unknown as User;
  }
}
