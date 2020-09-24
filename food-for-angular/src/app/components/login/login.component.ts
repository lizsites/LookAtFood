import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { User } from 'src/app/models/user';
import {Md5} from 'ts-md5/dist/md5';
import { Preference } from 'src/app/models/preference';
import { NavbarService } from 'src/app/services/navbar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username : string;
  public password : string;
  
  constructor(private login : LoginService, private navbar : NavbarService, private route : Router) {

   }
  
  ngOnInit(): void {

  }

  loginFunc(){
    
    let u = new User();
    u.username = this.username;
    u.password = Md5.hashStr(this.password).toString().toUpperCase();
    u.id = null;
    u.preference = new Preference(null,0,0,null);
    console.log(u);
    this.login.login(u).subscribe((data) => {
      console.log(data);
    
    
      /* 
      So if, the post method is successful,
      loginFunc() will do these things:

      It will retrieve user info from the back-end, 
      and publish it as a user in our angular model.
      Then we will set our loginService's user field to this data.

      By Doing so, any component that injects the login service dependency
      will also have the user credentials of a logged in user available.

      It will print the data and the login service user to demonstrate that the two
      are one in the same now.
      */

      /*Setting login Service's user field as the data */
      this.login.serviceUser = data;
      this.login.loggedIn = true;
      console.log("login service user " + this.login.serviceUser);
    
      this.route.navigate(['search']);
      
    }, () => {
      console.log("No you goofed");
    })
  }

  
}
