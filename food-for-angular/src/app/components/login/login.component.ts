import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username : string;
  public password : string;
  public visibility : boolean;
  constructor(private login : LoginService) {

   }

  ngOnInit(): void {
    this.visibility = true;
  }

  loginFunc(){
    
    let u = new User();
    u.username = this.username;
    u.password = this.password;
    u.id = null;
    console.log(u);
    this.login.login(u);
    this.login.login(u).subscribe((data) => {
      console.log(data);
      u = data;
      window.sessionStorage.setItem("username", u.username);
      console.log();
      this.visibility = false;
      
    }, () => {
      console.log("No you goofed");
    })
  }

}
