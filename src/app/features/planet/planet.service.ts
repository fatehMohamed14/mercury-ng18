import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { Planet } from './planet.models';

@Injectable()
export class PlanetService {
  readonly http = inject(HttpClient);
  protected readonly baseUrl = environment.planetApiUrl;
  constructor() {}
  loadAll = (): Observable<Planet[]> => {
    return this.http
      .get<{ data: Planet[] }>(this.baseUrl)
      .pipe(map((response) => response.data));
  };
}
