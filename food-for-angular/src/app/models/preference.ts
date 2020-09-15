import { StringifyOptions } from 'querystring';

export class Preference {
    query : string;
    minCalories : number;
    maxCalories : number;
    diet : string;
    cuisine : string;
    constructor(query : string, minCalories : number, maxCalories : number, cuisine : string, diet : string){
        this.query = query;
        this.maxCalories = maxCalories;
        this.minCalories = minCalories;
        this.cuisine = cuisine;
        this.diet = diet;
    }

}
