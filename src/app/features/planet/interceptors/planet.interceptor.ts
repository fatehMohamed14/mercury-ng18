import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { apiFullResponse } from '../planet.models';

export const planetInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('interceptor triggereed');
  // add query param to get only planet from solar system
  const planetReq = req.clone({
    setParams: {
      'filter[]': 'isPlanet,eq,true',
    },
  });
  return next(planetReq).pipe(
    filter((event) => event instanceof HttpResponse),
    map((event: HttpResponse<any>) => {
      console.log(event.body);
      // data transformation
      return event.clone({ body: { data: event.body.bodies } });
    })
  );
};
