import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiServices } from '../services/api-services';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-view-recipe',
  imports: [Header, Footer, RouterLink],
  templateUrl: './view-recipe.html',
  styleUrl: './view-recipe.css',
})
export class ViewRecipe {
  apiService = inject(ApiServices);
  router = inject(ActivatedRoute);
  recipeId: string = this.router.snapshot.params['id'];
  recipe: any = signal({});
  relatedRecipes: any = signal([]);

  navigate = inject(Router);

  ngOnInit() {
    this.getSingleRecipe(this.recipeId);
    
  }

  getSingleRecipe(id:string) {
    this.apiService.viewRecipeAPI(id).subscribe((res: any) => {
      this.recipe.set(res);
      console.log(this.recipe());

      // get related recipes
      this.getRelatedRecipes(res.cuisine);
    });
  }

  getRelatedRecipes(cuisine: string) {
    console.log("Inside getRelatedRecipes");
    
    this.apiService.getRelatedRecipesAPI(cuisine).subscribe((res: any) => {
      if(res.length > 1){
        console.log("Inside getRelatedRecipes check");
        this.relatedRecipes.set(res.filter((item:any) => item.name!=this.recipe().name))
        console.log(this.relatedRecipes());
      }
      else{
        this.relatedRecipes.set([])
      }
    });
  }

  getRelatedSingleRecipe(id:string){
    this.getSingleRecipe(id);
    this.navigate.navigateByUrl(`recipes/${id}/view`)
  }
}
