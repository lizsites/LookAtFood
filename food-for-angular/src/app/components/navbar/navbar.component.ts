import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  visibility : boolean = this.login.loggedIn;
  constructor(private login : LoginService) { }

  ngOnInit(): void {
  }

}
