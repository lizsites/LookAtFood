import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs';
import {
  User
} from '../models/user';
import {
  Recipe
} from '../models/recipe';
import {
  ResultDTO
} from '../models/result-dto';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {}

  public home(u: User): Observable < any > {
    let req: string = "https://api.spoonacular.com/recipes/complexSearch?" +
      "apiKey=f4f058137da84de2be93d7aa1b607872&number=6&sort=random";
      //parameter sort=random will randomize the retrieved recipes so they're not the same each time
      //should use this in the custom search too
	  
	  //todo: update home to match changes in search-api
    if (u.preference.dietType !== null){
      req = req.concat("&diet=" + u.preference.dietType);
    }
    if (u.preference.minCalories !== null){
      req = req.concat("&minCalories="+u.preference.minCalories);
    }
    if (u.preference.maxCalories !== null){
      req = req.concat("&maxCalories="+u.preference.maxCalories);
    }

    console.log(":::::::request being sent!!! :::::");
    console.log(req);
    return this.http.get(req) as Observable < any > ;
  }
  public viewRecipe(id : number): Observable < any > {
    {
      let req: string = "https://api.spoonacular.com/recipes/{" + id + "}/information?" +
        "apiKey=f4f058137da84de2be93d7aa1b607872";
    return this.http.get(req) as Observable<any>;
  }
}
  public saveRecipe(cr : Recipe): Observable < any > {
    //todo: allow editing of recipe through recipe component form
    let jsonRecipe : string = JSON.stringify(cr);
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
}
