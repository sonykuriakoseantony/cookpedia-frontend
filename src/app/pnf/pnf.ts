import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pnf',
  imports: [RouterLink],
  templateUrl: './pnf.html',
  styleUrl: './pnf.css',
})
export class Pnf {
  role : string = "user"
  constructor(private router: Router) {
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem('user') || '');
      this.role = user.role;
    }
  }

  // goHome() {
  //   this.router.navigate(['/']);
  // }

  // browseRecipes() {
  //   this.router.navigate(['/recipes']);
  // }
}
