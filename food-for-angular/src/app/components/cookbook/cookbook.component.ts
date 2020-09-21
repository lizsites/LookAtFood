import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Recipe } from 'src/app/models/recipe';

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.css']
})
export class CookbookComponent implements OnInit {
  recipes : Recipe[] = [] as Recipe[];
  constructor(private login : LoginService) { }

  ngOnInit(): void {
    if (this.login.serviceUser!==null && this.login.loggedIn){
      this.recipes = this.login.serviceUser.recipes;
      console.log("Initiated cookbook recipes :" + this.recipes)
    }
  }

}
