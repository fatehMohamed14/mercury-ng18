import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Country } from '../features/country/country.model';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

type CounterState = {
  counter: number;
};

const initialState: CounterState = {
  counter: 0,
};

export const CounterStore = signalStore(
  withState(initialState),
  withMethods((store) => {
    function randomNumber() {
      patchState(store, (state) => ({
        counter: Math.random(),
      }));
    }
    return { randomNumber };
  }),
  withDevtools(`counter-${Math.random()}`)
);
