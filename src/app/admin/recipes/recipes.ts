import { Component, inject, signal } from '@angular/core';
import { ApiServices } from '../../services/api-services';

@Component({
  selector: 'app-recipes',
  standalone: false,
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {

  apiService = inject(ApiServices);
  allRecipes : any = signal([]);
  searchKey : string = "";

  ngOnInit(){
    this.getAllRecipes();
  }

  getAllRecipes(){
    this.apiService.getAllRecipesAPI().subscribe((res: any) => {
      this.allRecipes.set(res)
    })
  }

  removeRecipe(id:string){
    this.apiService.removeRecipeAPI(id).subscribe((res:any)=>{
      alert("Recipe removed!");
      this.getAllRecipes();
    })
  }

}
