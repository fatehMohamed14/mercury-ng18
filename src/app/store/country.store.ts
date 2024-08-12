import { signalStore, withState } from '@ngrx/signals';
import { Country } from '../features/country/country.model';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

type CountryState = {
  countries: Country[];
  isLoading: boolean;
  searchQuery: string;
};

const initialState: CountryState = {
  countries: [],
  isLoading: false,
  searchQuery: '',
};

export const CountryStore = signalStore(
  withState(initialState),
  withDevtools('country')
);
