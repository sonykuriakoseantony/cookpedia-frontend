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

}
