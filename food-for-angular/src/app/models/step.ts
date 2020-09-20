import { Recipe } from './recipe';

export class Step {
    id : number;
    body : string;
    stepNum : number;
    recipe : Recipe;
}
