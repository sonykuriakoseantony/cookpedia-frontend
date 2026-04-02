import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => { // no need of parameters in this case (route, state)
  let router = inject(Router);
  const userString = sessionStorage.getItem('user');
  if (userString) {
    const user = JSON.parse(userString);
    if(user.role == "user"){
      return true;
    }
  }
  alert("You need to login to access this page.");
  router.navigate(['/login']);
  return false;
};
