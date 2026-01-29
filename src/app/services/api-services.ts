import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiServices {
  server_url = "http://localhost:3000"
  http = inject(HttpClient)

  
//-------------------------Auth Login/Register API--------------------------
  //register user api
  registerAPI(user:any) {
    return this.http.post(`${this.server_url}/register`, user);
  }

  //login user api
  loginAPI(user:any) {
    return this.http.post(`${this.server_url}/login`, user);
  }

  //-------------------------User API--------------------------
  //get user profile
  getUserProfileAPI(userId:any) {
    return this.http.get(`${this.server_url}/user/${userId}`);
  }

  //update user profile
  updateUserProfileAPI(userId:any, user:any) {
    return this.http.put(`${this.server_url}/user/${userId}`, user);
  }

  //-------------------------Recipes API--------------------------
  //get all recipes by home & recipes page
  getAllRecipesAPI() {
    return this.http.get(`${this.server_url}/recipes`);
  }

  appendToken(){
    const token = sessionStorage.getItem("token");
    let headers = new HttpHeaders();
    if(token){
      headers = headers.set("Authorization", `Bearer ${token}`)
    }
    return {headers};
  }

  //get recipe by id
  viewRecipeAPI(recipeId:any) {
    return this.http.get(`${this.server_url}/recipes/${recipeId}`, this.appendToken());
  }

  //get recipe by id
  getRelatedRecipesAPI(cuisine:string) {
    return this.http.get(`${this.server_url}/recipes-related?cuisine=${cuisine}`, this.appendToken());
  }

  //download recipe
  downloadRecipeAPI(recipeId:string, reqBody:any) {
    return this.http.post(`${this.server_url}/downloads/${recipeId}`, reqBody, this.appendToken());
  }

  //save recipe
  saveRecipeToCollectionAPI(recipeId:string, reqBody:any) {
    return this.http.post(`${this.server_url}/save-recipe/${recipeId}`, reqBody, this.appendToken());
  }

  //get all saved recipe
  getAllSavedRecipesAPI() {
    return this.http.get(`${this.server_url}/saved-recipes`, this.appendToken());
  }

  //delete a saved recipe
  removeSavedRecipesAPI(id:string) {
    return this.http.delete(`${this.server_url}/saved-recipes/${id}/delete`, this.appendToken());
  }

}
