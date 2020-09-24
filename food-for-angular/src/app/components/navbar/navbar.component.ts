import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public visibility : boolean = this.navbar.visibility;
  constructor(private login : LoginService, private route : Router, private navbar : NavbarService) { }

  ngOnInit(): void {
  }

  goToHome(){
    this.route.navigate(['home'])
  }
  goToCookbook(){
    this.route.navigate(['cookbook'])
  }
  goToLogOut(){
    this.route.navigate(['logout'])
  }
  goToSearch(){
    this.route.navigate(['search'])
  }
  goToUpdateUser(){
    this.route.navigate(['updateInfo'])
  }
  goToUploadPicture(){
    this.route.navigate(['upload'])
  }
  goToRecipeForm(){
    this.route.navigate(['recipe'])
  }
  goToNewRecipe(){
    this.route.navigate(['recipe'])
  }

}
