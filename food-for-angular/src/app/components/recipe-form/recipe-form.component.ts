import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { Step } from 'src/app/models/step';
import { Ingredient } from 'src/app/models/ingredient';
import { FormGroup, FormControl,FormBuilder,Validators, FormArray } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { RecipeFormService } from 'src/app/services/recipe-form.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  

  stepCount : number;

  RecipeForm = this.fb.group({
    title : new FormControl('', Validators.required),
    summary : new FormControl(''),
    calories : new FormControl(''),
    ingredients : this.fb.array([
      //this.fb.control('')
    ]),
     steps : this.fb.array([
       //this.fb.control('')
     ]),
    
  });

  get steps() {
    return this.RecipeForm.get('steps') as FormArray;
  }

  addStep(){
    this.steps.push(this.fb.control(''));
  }

  addPrefilledStep(body : string){
    this.steps.push(this.fb.control(body));
  }

  get ingredients(){
    return this.RecipeForm.get('ingredients') as FormArray;
  }

  addIngredient(){
    this.ingredients.push(this.fb.control(''));
  }

  addPrefilledIngredient(name : string){
    this.ingredients.push(this.fb.control(name))
  }


  constructor(private fb : FormBuilder, private rf : RecipeFormService, private login : LoginService) { }

  ngOnInit(): void {
    if (this.rf.serviceRecipe !==null){
      let recipe = this.rf.serviceRecipe;
      console.log("Recipe form recipe!!!!!!!!!");
    console.log(recipe);
    this.RecipeForm.get('title').setValue(recipe.title);
    this.RecipeForm.get('summary').setValue(recipe.summary);
    console.log("Testing Recipe Step")
    console.log(recipe.recipeStep)
    console.log(recipe.ingredients)
    for (let i = 0; i < recipe.recipeStep.length;i++){
     this.addPrefilledStep(recipe.recipeStep[i].body);
   
    }
    for (let i = 0; i < recipe.ingredients.length; i++){
      this.addPrefilledIngredient(recipe.ingredients[i].name);
    }
    
    } else {
      this.addStep();
      this.addIngredient();
    }
  }


  onSubmit(){
    
    let recipe = new Recipe();
    //recipe.owner = this.login.serviceUser;
    recipe.title = this.RecipeForm.get('title').value;
    recipe.summary = this.RecipeForm.get('summary').value;
    recipe.recipeStep = [];
    recipe.ingredients = [];
    this.stepCount = 0;
    for (let formStep of this.RecipeForm.get('steps').value){
      let step : Step = new Step();
      recipe.recipeStep.push(step);
      step.stepNum = ++this.stepCount;
      step.body = formStep;
      //step.recipe = recipe;
      console.log("Step being set: " + step)
    }
    for (let formIngred of this.RecipeForm.get('ingredients').value){
      let ingredient : Ingredient= new Ingredient();
      recipe.ingredients.push(ingredient);
      ingredient.name = formIngred;
      //ingredient.recipe = recipe;
      console.log("Ingredient being set: " + ingredient.name)
    }
    this.rf.sendRecipe(recipe).subscribe((data)=>{
      console.log(data);
      let recipe = data;
      
    },()=>{
      console.log("something went wrong");
    });
  }

}
