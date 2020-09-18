import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LogoutService } from 'src/app/services/logout.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private login : LoginService, private logout : LogoutService) { }

  ngOnInit(): void {
  }


   public logoutFunc(){
  
     this.logout.logoutFunc().subscribe(() => {
       }, () => {
      console.log("No you goofed");
      });

 }

}