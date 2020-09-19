import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { SaveRecipeService } from 'src/app/services/save-recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  currentRecipe : Recipe;
  formDiv : Element;
  constructor(private save : SaveRecipeService) { }

  ngOnInit(): void {
    this.formDiv = document.getElementById("formDiv");
    this.currentRecipe = this.save.getCR();
  }

}
