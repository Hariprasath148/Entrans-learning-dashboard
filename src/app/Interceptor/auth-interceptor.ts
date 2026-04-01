import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Loader } from '../service/loader';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

let requestCount = 0;

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  /**
   * clone the every request and bind the withcredentials with the request before go to the backend
   */

  var loaderService = inject(Loader);
  var router = inject(Router);

  if(!router.url.includes("questions")) {
    requestCount++;
    loaderService.setLoading(true);
  }
  else {
    requestCount++;
  }
 
  const cloneReq = req.clone({withCredentials:true});
  return next(cloneReq).pipe(
    finalize(() => {
      requestCount--;
      if(requestCount==0) loaderService.setLoading(false);
    })
  );
};
