import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { User } from 'src/app/models/user';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recipe : Recipe;
  
  constructor(private home : HomeService) { }
  

  ngOnInit(): void {
    //using test maxCalories to see if the get works
    let u : User = new User();
    u.maxCalories = 600;
    this.home.home(u);
    this.home.home(u).subscribe((data)=>{
      console.log(data);
      this.recipe = data;
    }) , ()=>{
      console.log("something went wrong");
    } 
  }
}
