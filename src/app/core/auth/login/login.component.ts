import { Component, inject, OnInit } from '@angular/core';
import { AuthStore } from '../../../store/auth.store';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'moh-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  readonly store = inject(AuthStore);

  ngOnInit(): void {
    console.log('init application');
    this.store.login({ username: 'admin', password: 'P@ssw0rd' });
  }
}
