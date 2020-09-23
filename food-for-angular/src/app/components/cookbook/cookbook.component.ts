import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Recipe } from 'src/app/models/recipe';
import { Picture } from 'src/app/models/picture';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.css']
})
export class CookbookComponent implements OnInit {
  recipes : Recipe[] = [] as Recipe[];
  pictures : Picture[] = [] as Picture[];
  constructor(private login : LoginService, private http : HttpClient) { }

  ngOnInit(): void {
    if (this.login.serviceUser!==null && this.login.loggedIn){
      this.recipes = this.login.serviceUser.recipes;
      this.pictures = this.login.serviceUser.pictures;
      console.log("Initiated cookbook recipes :" + this.recipes)
    }
  }
}
