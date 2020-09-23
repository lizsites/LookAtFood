import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Recipe } from '../models/recipe';
import { ResultDTO } from '../models/result-dto';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http : HttpClient) { }

  public home(u : User) : Observable<any>{
    let req : string = "https://api.spoonacular.com/recipes/complexSearch?" + 
    "apiKey=f4f058137da84de2be93d7aa1b607872&number=6";
    if (u.preference.dietType !== null){
      req = req.concat("&diet=" + u.preference.dietType);
    }
    if (u.preference.minCalories > 0){
      req = req.concat("&minCalories="+u.preference.minCalories);
    }
    if (u.preference.maxCalories > 0){
      req = req.concat("&maxCalories="+u.preference.maxCalories);
    }

    
    console.log(":::::::request being sent!!! :::::");
    console.log(req);
    return this.http.get(req) as Observable<any>;
  }
}
