import { Component, inject, signal } from '@angular/core';
import { ApiServices } from '../services/api-services';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saved-recipe',
  imports: [Header, Footer, RouterLink],
  templateUrl: './saved-recipe.html',
  styleUrl: './saved-recipe.css',
})
export class SavedRecipe {
  savedRecipes : any = signal([])
  apiService = inject(ApiServices);

  ngOnInit(){
    this.getSavedCollection();
  }

  getSavedCollection(){
    this.apiService.getAllSavedRecipesAPI().subscribe((res: any) => {
      this.savedRecipes.set(res);
      console.log(this.savedRecipes());

    });
  }

  removeSavedRecipe(id:string){
    this.apiService.removeSavedRecipesAPI(id).subscribe((res:any) => {
      this.getSavedCollection()
    })
  }
}
