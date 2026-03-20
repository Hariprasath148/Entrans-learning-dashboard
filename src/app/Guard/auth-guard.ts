import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';
import { Auth } from '../service/auth';

/**
 * Auth Gaurd - define user is authenticated or not
 * 
 * get the validation from the Backend API use validate funtion in the AUthUser service
 * 
 * @param {ActivatedRouteSnapshot} route - current routr snapshot
 * 
 * @returns true or false based on the validation
 */
export const AuthGuard: CanActivateFn = (route, state) => {

  const authService = inject(Auth);
  const router = inject(Router);

  /**
   * validate the user and "setUser" is used to set the current user
   */
  return authService.validate().pipe(
    map((res) => {
      authService.setUser(res);
      return true;
    }),
    catchError(() => {
      router.navigate(['/']);
      return of(false);
    })
  );

};