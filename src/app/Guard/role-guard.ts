import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../service/auth';
import { inject } from '@angular/core';

/**
 * Role Gaurd - defines which role access to the route
 * 
 * get the route and check the current user role and then return the result in boolean true or fase
 * 
 * @param {ActivatedRouteSnapshot} route - current routr snapshot
 * 
 * @returns true or fasle based on the roles and current user role in the route data
 */
export const RoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);
  const id = route.params['id'];
  const user = authService.getUser();
  /**
   * check the current used can access the route
   */
  if(!route.data['roles'].includes(user.role)) { 
    router.navigate(['dashboard']);
    return false;
  }
  
  /**
   * current is user role is User and they only allow to the ther data view and edit
   */
  if(id && user.role === "User" && id != user.id) {
    router.navigate(['dashboard']);
    return false;
  }

  return true;
};
