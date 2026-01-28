import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiServices } from '../services/api-services';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

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

  getSingleRecipe(id: string) {
    this.apiService.viewRecipeAPI(id).subscribe((res: any) => {
      this.recipe.set(res);
      console.log(this.recipe());

      // get related recipes
      this.getRelatedRecipes(res.cuisine);
    });
  }

  getRelatedRecipes(cuisine: string) {
    console.log('Inside getRelatedRecipes');

    this.apiService.getRelatedRecipesAPI(cuisine).subscribe((res: any) => {
      if (res.length > 1) {
        console.log('Inside getRelatedRecipes check');
        this.relatedRecipes.set(res.filter((item: any) => item.name != this.recipe().name));
        console.log(this.relatedRecipes());
      } else {
        this.relatedRecipes.set([]);
      }
    });
  }

  getRelatedSingleRecipe(id: string) {
    this.getSingleRecipe(id);
    this.navigate.navigateByUrl(`recipes/${id}/view`);
  }

  downloadRecipe() {
    this.apiService
      .downloadRecipeAPI(this.recipeId, {
        name: this.recipe().name,
        cuisine: this.recipe().cuisine,
        image: this.recipe().image,
      })
      .subscribe((res: any) => {
        console.log(res);
        //generate a pdf to downloaded recipe as pdf
        this.generatePDF();
      });
  }

  generatePDF() {
    const pdf = new jsPDF();
    let headRow = ['Name', 'Cuisine', 'Ingredients', 'Instructions', 'Calories', 'Servings'];
    let contentRow = [
      this.recipe().name,
      this.recipe().cuisine,
      this.recipe().ingredients,
      this.recipe().instructions,
      this.recipe().caloriesPerServing,
      this.recipe().servings,
    ];

    autoTable(pdf, {
      head: [headRow],
      body: [contentRow],
    });
    pdf.save(`${this.recipe().name}.pdf`);
  }

  saveRecipeToCollection() {
    this.apiService
      .saveRecipeToCollectionAPI(this.recipeId, {
        name: this.recipe().name,
        image: this.recipe().image,
      })
      .subscribe({
        next : (res:any)=>{
          alert(`${this.recipe().name} Added to your Collection!`)
        },
        error : (reason:any)=> {
          alert(reason.error)
        }
      });
  }

}
