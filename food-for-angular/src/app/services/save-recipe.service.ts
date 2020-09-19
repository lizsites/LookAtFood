import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class SaveRecipeService {
  private cr : Recipe;
  constructor(private http : HttpClient) { }

  public doSave(): Observable < any > {
    let jsonRecipe : string = JSON.stringify(this.cr);
    {
      return this.http.post("http://localhost:8089/food/recipe", jsonRecipe, {
        headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        },
        withCredentials : true,
        responseType : "json"
      }) as Observable<any>;
    }
  }
  public saveRecipe(cr : Recipe){
    this.cr = cr;
    //todo: allow editing of recipe through recipe component form
    
  }
  public getCR(){
    return this.cr;
  }
}
