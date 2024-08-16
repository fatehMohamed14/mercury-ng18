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
        style({ transform: 'scale(0.5)', opacity: 0 }), // initial
        animate(
          '0.2s cubic-bezier(0.0, 0.0, 1.0, 1.0)',
          style({ transform: 'scale(1)', opacity: 1 })
        ), // final
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
