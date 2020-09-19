import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  currentRecipe : Recipe;
  formDiv : Element;
  constructor() { }

  ngOnInit(): void {
    this.formDiv = document.getElementById("formDiv");
  }

}
