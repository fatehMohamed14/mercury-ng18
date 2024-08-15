import { Component, inject, OnInit } from '@angular/core';
import { PlanetStore } from '../../../store/planet.store';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
  selector: 'moh-planets',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatCardModule,
    MatChipsModule,
    FlexLayoutModule,
  ],
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
