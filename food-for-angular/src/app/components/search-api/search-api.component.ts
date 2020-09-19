import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { SearchService } from 'src/app/services/search.service';

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
  recipes : Recipe[] = [];
  constructor(private search : SearchService) { }

  ngOnInit(): void {
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
}
