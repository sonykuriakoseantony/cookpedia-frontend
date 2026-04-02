import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminAuthGuard: CanActivateFn = () => { // no need of parameters in this case (route, state)
  let router = inject(Router);
  const userString = sessionStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  if(user && user.role == "admin"){
    return true;
  }
  else{
    alert("You need to login as admin to access this page.");
    router.navigate(['/login']);
    return false;
  }
};
