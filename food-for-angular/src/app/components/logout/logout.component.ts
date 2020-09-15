import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { LogoutService } from 'src/app/services/logout.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private logout : LogoutService) { }

  ngOnInit(): void {
  }

  public logoutFunc(){
    let u : User = new User();
    this.logout.logoutFunc(u).subscribe((data) => {
      console.log(data);
      u = data;
    }, () => {
      console.log("No you goofed");
    });

}
}