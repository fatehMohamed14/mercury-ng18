import { Component, inject, OnInit } from '@angular/core';
import { AuthStore } from '../../../store/auth.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'moh-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  readonly store = inject(AuthStore);

  ngOnInit(): void {
    this.store.login({ username: 'admin', password: 'P@ssw0rd' });
  }
}
