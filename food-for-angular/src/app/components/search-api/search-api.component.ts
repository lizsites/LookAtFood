import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { SearchService } from 'src/app/services/search.service';
import { Preference } from 'src/app/models/preference';

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
 lookingAtRecipe : boolean = true;
  recipes : Recipe[] = [];
  constructor(private search : SearchService) { }

  ngOnInit(): void {
  }

  getInfo(id : number){
    console.log(id);
    this.search.getMoreInfo(id);
    this.search.getMoreInfo(id).subscribe((data)=>{
      console.log(data);
      this.lookingAtRecipe = !this.lookingAtRecipe;
      let instructions : string = data.instructions;
      let bodyDiv =document.createElement("div");
      let par = document.createElement("p");
      let button = document.createElement("button");
      par.innerHTML = instructions;
      par.id = "par";
      button.onclick = this.hideInstructions;
      button.innerHTML = "click to hide";
      bodyDiv.appendChild(par);
      document.getElementById("page-body").appendChild(bodyDiv);
      document.getElementById("page-body").appendChild(bodyDiv);
    })
  }

  hideInstructions(){
    this.lookingAtRecipe = !this.lookingAtRecipe;
    document.getElementById("par").style.visibility="hidden";
  }

  searchApi(){
    let preference : Preference = new Preference(this.query, this.maxCalories, this.minCalories, this.cuisine, null);
    this.search.customSearch(preference);
    this.search.customSearch(preference).subscribe((data)=>{
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
