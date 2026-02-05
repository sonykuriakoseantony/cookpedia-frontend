import { Component, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterLink } from "@angular/router";
import { ApiServices } from '../services/api-services';

@Component({
  selector: 'app-home',
  imports: [Header, Footer, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  allRecipes : any = signal([]);
  allFeedbacks : any = signal([]);
  api = inject(ApiServices);

  ngOnInit(){
    this.getRecipesForHome();
    // this.getAllFeedbacks();
    this.getApprovedFeedbacks();
  }

  getRecipesForHome() {
    this.api.getAllRecipesAPI().subscribe((result: any) => {
      const homeRecipes = result.slice(0, 6);
      this.allRecipes.set(homeRecipes)
      console.log(this.allRecipes());
    } );
  }
  getApprovedFeedbacks(){
    //fetch feedbacks from db
    this.api.getApprovedFeedbacksAPI().subscribe((result : any) => {
      this.allFeedbacks.set(result);
      console.log(this.allFeedbacks());
      
    })
  }
}
