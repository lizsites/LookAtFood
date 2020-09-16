import { StringifyOptions } from 'querystring';

export class Preference {
   
    minCalories : number;
    maxCalories : number;
    diet : string;
    
    constructor( minCalories : number, maxCalories : number, diet : string){
       
        this.maxCalories = maxCalories;
        this.minCalories = minCalories;
      
        this.diet = diet;
    }

}
