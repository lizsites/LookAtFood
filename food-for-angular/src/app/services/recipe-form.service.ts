import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RecipeFormService {

  serviceRecipe: Recipe = new Recipe();
  constructor(private route: Router, private http: HttpClient) { }


  setRecipeForm(recipe: Recipe) {
    this.serviceRecipe = recipe;
    console.log("Service Recipe!!!!!")
    console.log(this.serviceRecipe);
    this.route.navigate(['recipe'])
  }

  sendRecipe(recipe: Recipe): Observable<User> {

    console.log("messing with Object.keys !!!!!!1")
    console.log(Object.keys(recipe));
    console.log(Object.keys(recipe.recipeSteps))
    console.log(Object.values(recipe.recipeSteps))

    console.log("recipe about to be saved to the database");
    console.log(recipe);
    return this.http.post("http://localhost:8090/food/recipe", recipe, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: true,
      responseType: "json"
    }) as Observable<User>;
  }
}
