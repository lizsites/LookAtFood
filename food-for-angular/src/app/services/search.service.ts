import { Injectable } from '@angular/core';
import { Preference } from '../models/preference';
import { Recipe } from '../models/recipe';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResultDTO } from '../models/result-dto';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  

  constructor(private http : HttpClient) { }

  public customSearch(query : string, cuisine : string, minCalories : number, maxCalories : number, diet : string) : Observable<any>{
    let req : string = "https://api.spoonacular.com/recipes/complexSearch?" + 
    "apiKey=f4f058137da84de2be93d7aa1b607872&number=7";

    console.log();

    if (query !=null){
      req = req.concat("&query="+query);
    }

    if (cuisine != null){
      req = req.concat("&cuisine=" + cuisine);
    }
    if (minCalories != null){
      req = req.concat("&minCalories="+minCalories);
    }
    if (maxCalories != null){
      req = req.concat("&maxCalories="+maxCalories);
    }

    
    console.log(":::::::request being sent!!! :::::");
    console.log(req);
    return this.http.get(req) as Observable<any>;
  }

  public getNutrientInfo(id : number){

  }

  getMoreInfo(id : number) : Observable<any>{
    let req : string = "https://api.spoonacular.com/recipes/" +
    id + "/information?includeNutrition=true" +
    "&apiKey=f4f058137da84de2be93d7aa1b607872";
    console.log(req);
    return this.http.get(req) as Observable<any>;
  }

}
