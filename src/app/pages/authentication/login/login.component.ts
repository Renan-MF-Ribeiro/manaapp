import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SwalService } from '@services/swal.service';
import { LoadingService } from '@services/loading.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router, RouterModule } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { map, switchMap, tap } from 'rxjs';
import { SupabaseService } from '@services/supabase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    RouterModule,
    FloatLabelModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private _authenticationService = inject(AuthenticationService);
  private _supabaseService = inject(SupabaseService);
  private _swalService = inject(SwalService);
  private _loading = inject(LoadingService);
  private _router = inject(Router);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this._supabaseService.currentUser.subscribe((user) => {
      if (!!user) {
        this._router.navigate(['/home']);
        this._authenticationService.getProfile();
      }
    });
  }

  login() {
    this._loading.show();
    if (this.form.valid) {
      const value = this.form.getRawValue();
      this._authenticationService
        .signIn(value.email!, value.password!)
        .subscribe({
          next: (data) => {
            if (data.error) {
              this._loading.hide();
              console.error(data.error.message);
              this._swalService.error('Ops', 'Usuário ou senha inválidos');
            } else {
              this._loading.hide();
              this._router.navigate(['home']);
            }
          },
          error: (error) => {
            this._loading.hide();
            console.error(error);
            this._swalService.error('Ops', error);
          },
        });
    }
  }
  // logout() {
  //   this.afAuth.signOut();
  // }
}
