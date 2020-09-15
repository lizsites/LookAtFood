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

  public customSearch(preference : Preference) : Observable<ResultDTO>{
    let req : string = "https://api.spoonacular.com/recipes/complexSearch?" + 
    "apiKey=f4f058137da84de2be93d7aa1b607872&number=7";

    if (preference.query !=null){
      req = req.concat("&query="+preference.query);
    }

    if (preference.cuisine != null){
      req = req.concat("&cuisine=" + preference.cuisine);
    }
    if (preference.minCalories != null){
      req = req.concat("&minCalories="+preference.minCalories);
    }
    if (preference.maxCalories != null){
      req = req.concat("&maxCalories="+preference.maxCalories);
    }

    
    console.log(":::::::request being sent!!! :::::");
    console.log(req);
    return this.http.get(req) as Observable<ResultDTO>;
  }

  public getNutrientInfo(id : number){

  }

}
