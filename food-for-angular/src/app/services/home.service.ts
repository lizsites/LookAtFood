import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http : HttpClient) { }

  public home(u : User) : Observable<Recipe>{
    // let req : string = "https://api.spoonacular.com/recipes/complexSearch?" + 
    // "apiKey=f4f058137da84de2be93d7aa1b607872&number=1&maxCalories="+u.maxCalories
    let req : string = "https://jsonplaceholder.typicode.com/posts/1";
    
    return this.http.get(req) as Observable<Recipe>;
  }
}
