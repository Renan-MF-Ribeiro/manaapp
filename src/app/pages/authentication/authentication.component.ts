import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CommonModule, LoginComponent, RouterModule],
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent {
  _router = inject(Router);
}
