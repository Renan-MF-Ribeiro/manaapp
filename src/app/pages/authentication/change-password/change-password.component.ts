import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@services/loading.service';
import { SwalService } from '@services/swal.service';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthenticationService } from '../services/authentication.service';
import {
  passwordMatchValidator,
  passwordValidator,
} from '@validators/passwordMatch';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordCheckerComponent } from '@components/form/password-checker/password-checker.component';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    PasswordCheckerComponent,
  ],
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
  private _authenticationService = inject(AuthenticationService);
  private _swalService = inject(SwalService);
  private _loading = inject(LoadingService);
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  mode!: string;
  actionCode!: string;

  constructor() {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.mode = params['mode'];
      this.actionCode = params['oobCode'];
    });
  }

  form = new FormGroup(
    {
      password: new FormControl('', [Validators.required, passwordValidator]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchValidator },
  );

  change() {
    if (this.form.valid) {
      this._loading.show();
      this._authenticationService
        .changePassword(this.actionCode, this.form.value.password!)
        .subscribe({
          next: (value) => {
            this._loading.hide();
            this._swalService
              .success('Sucesso', 'Senha alterada com sucesso')
              .then(() => this._router.navigate(['']));
          },
          error: (error) => {
            this._loading.hide();
            console.error(error);
            this._swalService.error('Ops', error);
          },
        });
    }
  }
}
