import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CountryStore } from '../../../store/country.store';

@Component({
  selector: 'moh-countries',
  standalone: true,
  providers: [CountryStore],
  imports: [],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesComponent {
  readonly store = inject(CountryStore);
}
