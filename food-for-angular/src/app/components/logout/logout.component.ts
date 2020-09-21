import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LogoutService } from 'src/app/services/logout.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private login : LoginService, private logout : LogoutService, private route : Router) { }

  ngOnInit(): void {
  }


   public logoutFunc(){
  
     this.logout.logoutFunc().subscribe(() => {
       console.log("successfully logged out");
      this.route.navigate(["/"]);
       }, () => {
      console.log("No you goofed");
      });

 }

}