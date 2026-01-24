import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  recipeId:string = this.router.snapshot.params['id'];
  recipe:any = signal({});

  ngOnInit(){
    this.getSingleRecipe();
  }

  getSingleRecipe(){
    this.apiService.viewRecipeAPI(this.recipeId).subscribe((res:any)=>{
      this.recipe.set(res);
      console.log(this.recipe());
    });
  }

}
