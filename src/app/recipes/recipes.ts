import { Component, inject, signal } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { ApiServices } from '../services/api-services';
import { SearchPipe } from '../pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

//approach for search form was template driven (FormsModule)

@Component({
  selector: 'app-recipes',
  imports: [Header, Footer, SearchPipe, FormsModule, NgxPaginationModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {

  p : number = 1;
  searchKey : string = "" ;
  allRecipes : any = signal([]);
  cuisineArray : any = signal([]);
  mealTypeArray : any = signal([]);
  dummyAllRecipes : any = [];

  api = inject(ApiServices)

  ngOnInit(){
    this.getRecipes();
  }

  getRecipes() {
    this.api.getAllRecipesAPI().subscribe((result: any) => {
      this.allRecipes.set(result)
      this.dummyAllRecipes = result;
      let dummyCuisineArray = result.map((item:any)=>item.cuisine);
      dummyCuisineArray.forEach((cuisine : any) => {

        !this.cuisineArray().includes(cuisine) && this.cuisineArray().push(cuisine)
        
      });


      let dummyMealArray = result.map((item:any)=>item.mealType).flat(Infinity);
      dummyMealArray.forEach((meal : any) => {

        !this.mealTypeArray().includes(meal) && this.mealTypeArray().push(meal)
        
      });

      
    } );
  }

  filterRecipe(key:string, value:string){
    this.allRecipes.set(this.dummyAllRecipes.filter((recipe:any) => recipe[key] == value))
  }

}
