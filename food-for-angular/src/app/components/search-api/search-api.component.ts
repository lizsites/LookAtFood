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

  recipes : Recipe[] = [];
  constructor(private search : SearchService) { }

  ngOnInit(): void {
  }

  getInfo(id : number){
    console.log(id);
    
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
        this.recipes[i].id = arrRecipe[i].id;
        this.recipes[i].title = arrRecipe[i].title;
       
        console.log("recipe info " + this.recipes[i].title);

  }

    })

  }
}
