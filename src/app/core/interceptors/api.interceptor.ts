import { HttpInterceptorFn } from '@angular/common/http';

export const apiTokenInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
