import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeModel } from '../models/recipeModel';
import { ApiServices } from '../../services/api-services';

@Component({
  selector: 'app-manage-recipe',
  standalone: false,
  templateUrl: './manage-recipe.html',
  styleUrl: './manage-recipe.css',
})
export class ManageRecipe {
  router = inject(Router);
  apiService = inject(ApiServices);
  route = inject(ActivatedRoute);
  recipeId = this.route.snapshot.params['id'];
  recipeDetails = signal<RecipeModel>({});

  ingredientArray: any = [];
  instructionsArray: any = [];
  mealTypeArray: any = [];

  ngOnInit() {
    if (this.recipeId) {
      this.apiService.getAllRecipesAPI().subscribe((res: any) => {
        this.recipeDetails.set(res.find((item: any) => item._id == this.recipeId));
        this.ingredientArray = this.recipeDetails().ingredients;
        this.instructionsArray = this.recipeDetails().instructions;
        this.mealTypeArray = this.recipeDetails().mealType;
      });
    }
  }

  addIngredient(input: HTMLTextAreaElement) {
    if (input.value) {
      this.ingredientArray.push(input.value);
      input.value = '';
    }
  }

  removeIngredient(value: string) {
    this.ingredientArray = this.ingredientArray.filter((item: string) => item != value);
  }

  addInstruction(input: HTMLTextAreaElement) {
    if (input.value) {
      this.instructionsArray.push(input.value);
      input.value = '';
    }
  }
  removeInstruction(value: string) {
    this.instructionsArray = this.instructionsArray.filter((item: string) => item != value);
  }

  addMealType(input: HTMLInputElement) {
    if (input.value) {
      this.mealTypeArray.push(input.value);
      input.value = '';
    }
  }
  removeMealType(value: string) {
    this.mealTypeArray = this.mealTypeArray.filter((item: string) => item != value);
  }

  addRecipe() {
    this.recipeDetails().ingredients = this.ingredientArray;
    this.recipeDetails().instructions = this.instructionsArray;
    this.recipeDetails().mealType = this.mealTypeArray;
    const {
      name,
      ingredients,
      instructions,
      prepTimeMinutes,
      cookTimeMinutes,
      servings,
      difficulty,
      cuisine,
      caloriesPerServing,
      image,
      mealType,
    } = this.recipeDetails();

    if (
      name &&
      ingredients &&
      instructions &&
      prepTimeMinutes &&
      cookTimeMinutes &&
      servings &&
      difficulty &&
      cuisine &&
      caloriesPerServing &&
      image &&
      mealType
    ) {
      this.apiService.addRecipeAPI(this.recipeDetails()).subscribe({
        next: (response: any) => {
          alert('Recipe added successfully');
          this.router.navigate(['/admin/recipes']);
        },
        error: (reason: any) => {
          console.error('Error adding Recipe:', reason.error);
          alert(reason.error);
        },
      });
    } else {
      alert('Fill all the fields to save a recipe!!');
    }
  }

  editRecipe() {
    console.log("In edit func befor api call : === : ", typeof(this.recipeId));
    
   this.recipeDetails().ingredients = this.ingredientArray;
    this.recipeDetails().instructions = this.instructionsArray;
    this.recipeDetails().mealType = this.mealTypeArray;
    const {
      name,
      ingredients,
      instructions,
      prepTimeMinutes,
      cookTimeMinutes,
      servings,
      difficulty,
      cuisine,
      caloriesPerServing,
      image,
      mealType,
    } = this.recipeDetails();

    if (
      name &&
      ingredients &&
      instructions &&
      prepTimeMinutes &&
      cookTimeMinutes &&
      servings &&
      difficulty &&
      cuisine &&
      caloriesPerServing &&
      image &&
      mealType
    ) {
      this.apiService.ediptRecipeAPI(this.recipeId, this.recipeDetails()).subscribe((res:any)=>{
          alert('Recipe updated successfully');
          this.router.navigate(['/admin/recipes']);
      });
    } else {
      alert('Fill all the fields to save a recipe!!');
    }
  }
}
