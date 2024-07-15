import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoadingService } from '@services/loading.service';
import { SwalService } from '@services/swal.service';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthenticationService } from '../services/authentication.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordCheckerComponent } from '@components/form/password-checker/password-checker.component';
import {
  passwordMatchValidator,
  passwordValidator,
} from '@validators/passwordMatch';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    RouterModule,
    FloatLabelModule,
    PasswordCheckerComponent,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private _authenticationService = inject(AuthenticationService);
  private _swalService = inject(SwalService);
  private _loading = inject(LoadingService);
  private _router = inject(Router);

  form = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, passwordValidator]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchValidator },
  );

  register() {
    if (this.form.valid) {
      this._loading.show();
      const value = this.form.getRawValue();
      this._authenticationService
        .signUp(value.email!, value.password!)
        .subscribe({
          next: (value) => {
            this._loading.hide();
            console.log(value);
            this._swalService
              .success('Sucesso', 'Cadastro realizado com sucesso!')
              .then(() => this._router.navigate(['home']));
          },
          error: (error) => {
            this._loading.hide();
            console.error(error);
            this._swalService.error('Ops', error);
          },
        });
    } else {
      this._swalService.error(
        'Ops',
        'Existem campos que precisam ser preenchidos corretamente',
      );
    }
  }
}
