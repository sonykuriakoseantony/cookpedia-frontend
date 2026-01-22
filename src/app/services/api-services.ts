import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiServices {
  server_url = "http://localhost:3000"
  http = inject(HttpClient)

  //get all recipes by home & recipes page
  getAllRecipesAPI() {
    return this.http.get(`${this.server_url}/recipes`);
  }

  //register user api
  registerAPI(user:any) {
    return this.http.post(`${this.server_url}/register`, user);
  }

  //login user api
  loginAPI(user:any) {
    return this.http.post(`${this.server_url}/login`, user);
  }

  //get user profile
  getUserProfileAPI(userId:any) {
    return this.http.get(`${this.server_url}/user/${userId}`);
  }

  //update user profile
  updateUserProfileAPI(userId:any, user:any) {
    return this.http.put(`${this.server_url}/user/${userId}`, user);
  }

  //save recipe for user
  saveRecipeAPI(userId:any, recipeId:any) {
    return this.http.post(`${this.server_url}/save-recipe`, {userId, recipeId});
  }

  //get saved recipes for user
  getSavedRecipesAPI(userId:any) {
    return this.http.get(`${this.server_url}/saved-recipes/${userId}`);
  }

  //delete saved recipe
  deleteSavedRecipeAPI(userId:any, recipeId:any) {
    return this.http.delete(`${this.server_url}/saved-recipe/${userId}/${recipeId}`);
  }

  //get all recipes by search
  searchRecipesAPI(searchTerm:any) {
    return this.http.get(`${this.server_url}/recipes/search?query=${searchTerm}`);
  }

}
