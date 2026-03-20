import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  /**
   * clone the every request and bind the withcredentials with the request before go to the backend
   */
  const cloneReq = req.clone({withCredentials:true});
  return next(cloneReq);
};
