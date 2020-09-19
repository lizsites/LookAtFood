import {
  Component,
  OnInit
} from '@angular/core';
import {
  User
} from 'src/app/models/user';
import {
  HomeService
} from 'src/app/services/home.service';
import {
  LoginService
} from 'src/app/services/login.service';
import {
  Recipe
} from 'src/app/models/recipe';
import { SaveRecipeService } from 'src/app/services/save-recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recipes: Recipe[] = [];
  currentRecipe : Recipe;
  u: User;
  constructor(private home: HomeService, private login: LoginService, private save: SaveRecipeService) {}
  lookingAtRecipe : boolean = false;
  saving : boolean = false;

  ngOnInit(): void {
    //load recommended recipes
    this.u = this.login.serviceUser;
    this.home.home(this.u).subscribe((data) => {
      console.log(data);

      let arrRecipe: any[] = data.results;

      console.log("arrRecipe" + arrRecipe);
      console.log("arrRecipe title" + arrRecipe[0].title);
      console.log("arrRecipe calories" + arrRecipe[0].nutrition.nutrients[0].amount);

      for (let i = 0; i < arrRecipe.length; i++) {
        this.recipes[i] = new Recipe();
        this.recipes[i].title = arrRecipe[i].title;
        this.recipes[i].calories = arrRecipe[i].nutrition.nutrients[0].amount;
        console.log("recipe info " + this.recipes[i].title + " " + this.recipes[i].calories);

      }
    }), () => {
      console.log("error!");
    }
  }
  viewRecipe(id : number) {
    this.currentRecipe = this.recipes[id];
    console.log(id);
    this.home.viewRecipe(id).subscribe((data)=>{
      console.log(data);
      this.lookingAtRecipe = true;
      let instructions : any[] = data.analyzedInstructions[0].steps;
      let info = document.getElementById("recipe_info");
      for (let instruction of instructions){
        //print each step
        let step = document.createElement("p");
        step.innerHTML = instruction.step;
        info.appendChild(step);
      }
      let bodyDiv = document.createElement("div");
      
      info.appendChild(bodyDiv);
      //let hideButton = document.createElement("button");
      //hideButton.innerHTML = "click to hide";
      let saveButton = document.createElement("button");
      
      saveButton.innerHTML = "save recipe";
      
      saveButton.addEventListener("onclick", this.saveRecipe);
      info.appendChild(saveButton);
    
    })
    }
    saveRecipe(){
      //show recipe-form component
      this.saving = true;
      this.save.saveRecipe(this.currentRecipe);
    }
  }
  
