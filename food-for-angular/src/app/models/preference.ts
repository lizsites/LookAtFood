import { StringifyOptions } from 'querystring';

export class Preference {
   
    id : number;
    minCalories : number;
    maxCalories : number;
    dietType : string;
    
    constructor( id: number, minCalories : number, maxCalories : number, diet : string){
        this.id = id;
        this.maxCalories = maxCalories;
        this.minCalories = minCalories;
        this.dietType = diet;
    }

}
