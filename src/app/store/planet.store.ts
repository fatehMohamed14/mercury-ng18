import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Planet } from '../features/planet/planet.models';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { PlanetService } from '../features/planet/planet.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
type PlanetState = {
  planets: Planet[];
  isLoading: boolean;
};

const initialState: PlanetState = {
  planets: [],
  isLoading: false,
};

export const PlanetStore = signalStore(
  withState(initialState),
  withMethods((store, planetService = inject(PlanetService)) => {
    const loadAll = rxMethod(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          planetService.loadAll().pipe(
            tapResponse({
              next: (planets) => {
                console.log('Planets', planets);
                patchState(store, { planets, isLoading: false });
              },
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            })
          )
        )
      )
    );
    return { loadAll };
  }),
  withDevtools('planet')
);
