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

  public home(u: User): Observable < ResultDTO > {
    let req: string = "https://api.spoonacular.com/recipes/complexSearch?" +
      "apiKey=f4f058137da84de2be93d7aa1b607872&number=6&sort=random";
      //parameter sort=random will randomize the retrieved recipes so they're not the same each time
      //should use this in the custom search too
    if (u.diet !== null) {
      req = req.concat("&diet=" + u.diet);
    }
    if (u.minCalories !== null) {
      req = req.concat("&minCalories=" + u.minCalories);
    }
    if (u.maxCalories !== null) {
      req = req.concat("&maxCalories=" + u.maxCalories);
    }


    console.log(":::::::request being sent!!! :::::");
    console.log(req);
    return this.http.get(req) as Observable < ResultDTO > ;
  }
  public viewRecipe(id : number): Observable < Recipe > {
    {
      let req: string = "https://api.spoonacular.com/recipes/{" + id + "}/information?" +
        "apiKey=f4f058137da84de2be93d7aa1b607872";
      return this.http.get(req) as Observable< Recipe >;
    }
  }
}
