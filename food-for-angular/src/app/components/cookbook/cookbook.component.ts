import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Recipe } from 'src/app/models/recipe';
import { Step } from 'src/app/models/step';
import { Ingredient } from 'src/app/models/ingredient';
import { RecipeFormService } from 'src/app/services/recipe-form.service';
import { SearchService } from 'src/app/services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.css']
})
export class CookbookComponent implements OnInit {
  recipes : Recipe[] = [] as Recipe[];
  constructor(private login : LoginService, private rf : RecipeFormService, private search : SearchService, private route : Router) { }

  ngOnInit(): void {
    if (this.login.serviceUser!==null && this.login.loggedIn){
      this.recipes = this.login.serviceUser.recipes;
      console.log("Initiated cookbook recipes :" + this.recipes)
    }
  }
  refresh(){
    this.recipes = this.login.serviceUser.recipes;
    this.route.navigate(['cookbook']);
  }
  saveRecipe(recipe : Recipe){
    this.search.getMoreInfo(recipe.id).subscribe((data)=>{

      console.log("data being retrieved :" + data);

      for (let i = 0; i < data.analyzedInstructions[0].steps.length; i++){
        let step : Step = new Step();
        recipe.recipeSteps[i] = step;     
        step.stepNum = data.analyzedInstructions[0].steps[i].number;
        step.body = data.analyzedInstructions[0].steps[i].step;
        step.recipe = recipe;
        
      }
      for (let i = 0; i < data.extendedIngredients.length; i++){
        let ingredient = new Ingredient();
        recipe.ingredients.push(ingredient);
        ingredient.name = data.extendedIngredients[i].original;
        ingredient.recipe = recipe;
       
      }
      //This knocks off lengthier summaries
      let firstSentenace = data.summary.split('.');
      recipe.summary = firstSentenace[0] + ".";
      console.log(data);
      this.rf.setRecipeForm(recipe);
    }, ()=>{

    });

    
  }

}
