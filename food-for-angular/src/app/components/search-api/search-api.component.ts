import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { SearchService } from 'src/app/services/search.service';
import { Preference } from 'src/app/models/preference';
import { RecipeFormService } from 'src/app/services/recipe-form.service';
import { Step } from 'src/app/models/step';
import { Ingredient } from 'src/app/models/ingredient';
import { LoginService } from 'src/app/services/login.service';
import { HomeComponent } from '../home/home.component';
import { HomeService } from 'src/app/services/home.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-search-api',
  templateUrl: './search-api.component.html',
  styleUrls: ['./search-api.component.css']
})

export class SearchApiComponent implements OnInit {
 cuisine : string;
 minCalories : number;
 maxCalories : number;
 query : string;
 recipeId : number;
 lookingAtRecipe : boolean;
 u : User;
  recipes : Recipe[] = [];
  constructor(private search : SearchService, private rf : RecipeFormService, private login : LoginService, private home : HomeService) { }

  ngOnInit(): void {
    this.u = this.login.serviceUser;
    this.home.home(this.u).subscribe((data)=>{
      console.log(data);
      
      let arrRecipe : any[] = data.results;
      
      console.log("arrRecipe" +arrRecipe);
      console.log("arrRecipe title!!!! " +arrRecipe[0].title);
      //console.log("arrRecipe calories" + arrRecipe[0].nutrition.nutrients[0].amount);
      
      for (let i = 0; i < arrRecipe.length; i++){
        this.recipes[i] = new Recipe();
        this.recipes[i].id = arrRecipe[i].id;
        this.recipes[i].title = arrRecipe[i].title;
        //this.recipes[i].calories = arrRecipe[i].nutrition.nutrients[0].amount;
        //console.log("recipe info " + this.recipes[i].title + " " + this.recipes[i].calories);

      }
    }) , ()=>{
      console.log("error!");
    } 
  }

  getInfo(id : number){
    console.log(id);
    this.search.getMoreInfo(id).subscribe((data)=>{
      console.log(data);
      this.lookingAtRecipe = true;
      let instructions : any[] = data.analyzedInstructions[0].steps;
      for (let instruction of instructions){
        let step = document.createElement("p");
        step.innerHTML = instruction.step;
        document.getElementById("page-body").appendChild(step);
      }
      let bodyDiv =document.createElement("div");
      let par = document.createElement("p");
      let button = document.createElement("button");
      
      par.id = "par";
      button.onclick = this.hideInstructions;
      button.innerHTML = "click to hide";
      bodyDiv.appendChild(par);
      document.getElementById("page-body").appendChild(bodyDiv);
      document.getElementById("page-body").appendChild(button);
    })
  }

  hideInstructions(){
    this.lookingAtRecipe = !this.lookingAtRecipe;
    document.getElementById("par").innerHTML="";
  }

  searchApi(){
    

    this.search.customSearch(this.query,this.cuisine,this.minCalories,this.maxCalories, null).subscribe((data)=>{
      console.log(data);
      
      let arrRecipe : any[] = data.results;
      
      console.log("arrRecipe" +arrRecipe[0]);
      console.log("arrRecipe title!!!! " +arrRecipe[0].title);
      //console.log("arrRecipe calories" + arrRecipe[0].nutrition.nutrients[0].amount);
      
      for (let i = 0; i < arrRecipe.length; i++){
        this.recipes[i] = new Recipe();
        this.recipes[i].title = arrRecipe[i].title;
        this.recipes[i].id = arrRecipe[i].id;
        console.log("recipe info " + this.recipes[i].title);

  }

    })

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
