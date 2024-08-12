import { signalStore, withState } from '@ngrx/signals';
import { Country } from '../features/country/country.model';

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

export const CountryStore = signalStore(withState(initialState));
