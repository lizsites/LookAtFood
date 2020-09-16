import {
  Component,
  Input,
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recipes: Recipe[] = [];
  currentRecipe : Element;
  u: User;
  lookingAtRecipe: boolean = false;
  constructor(private home: HomeService, private login: LoginService) {}


  ngOnInit(): void {
    //load recommended recipes
    this.u = this.login.serviceUser;
    this.home.home(this.u);
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
  viewRecipe(id: number) {
    console.log(id);
    this.home.viewRecipe(id);
    this.home.viewRecipe(id).subscribe((data)=>{
      console.log(data);
      this.lookingAtRecipe = !this.lookingAtRecipe;
      let instructions : string = data.instructions;
      let bodyDiv = document.createElement("div");
      let par = document.createElement("p");
      let button = document.createElement("button");
      par.innerHTML = instructions;
      par.id = "par";
      button.innerHTML = "click to hide";
      bodyDiv.appendChild(par);
      document.getElementById("auto_recipes").appendChild(bodyDiv);
    })
    }
  }
