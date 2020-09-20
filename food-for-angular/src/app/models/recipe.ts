import { Step } from './step';
import { Ingredient } from './ingredient';
import { User } from './user';

export class Recipe {
    owner : User;
    id : number;
    title : string;
    calories : number;
    summary : string;
    recipeStep : Step[] = [] as Step[];
    ingredients : Ingredient[] = [] as Ingredient[];
}
