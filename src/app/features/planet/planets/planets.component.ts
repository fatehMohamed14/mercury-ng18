import { Component, inject, OnInit } from '@angular/core';
import { PlanetStore } from '../../../store/planet.store';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatDividerModule } from '@angular/material/divider';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'moh-planets',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatCardModule,
    MatChipsModule,
    FlexLayoutModule,
    MatDividerModule,
  ],
  providers: [PlanetStore],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.scss',
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate(200, style({ opacity: 1, height: 'fit-content' })),
      ]),
    ]),
  ],
})
export class PlanetsComponent implements OnInit {
  readonly planetStore = inject(PlanetStore);

  ngOnInit(): void {
    this.planetStore.loadAll(null);
  }
}
