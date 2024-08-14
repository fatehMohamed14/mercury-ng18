import { Component, inject, OnInit } from '@angular/core';
import { PlanetStore } from '../../../store/planet.store';

@Component({
  selector: 'moh-planets',
  standalone: true,
  imports: [],
  providers: [PlanetStore],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.scss',
})
export class PlanetsComponent implements OnInit {
  readonly planetStore = inject(PlanetStore);

  ngOnInit(): void {
    this.planetStore.loadAll(null);
  }
}
