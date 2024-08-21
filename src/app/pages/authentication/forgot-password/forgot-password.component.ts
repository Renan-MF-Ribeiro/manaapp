import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingService } from '@services/loading.service';
import { SwalService } from '@services/swal.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  private _authenticationService = inject(AuthenticationService);
  private _swalService = inject(SwalService);
  private _loading = inject(LoadingService);
  private _router = inject(Router);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  recover() {
    if (this.form.valid) {
      this._loading.show();
      const value = this.form.getRawValue();
      // this._authenticationService.recoveryPassword(value.email!).subscribe({
      //   next: (value) => {
      //     this._loading.hide();
      //     this._swalService
      //       .success('Sucesso', 'Email de recupeção enviado')
      //       .then(() => this._router.navigate(['']));
      //   },
      //   error: (error) => {
      //     this._loading.hide();
      //     console.error(error);
      //     this._swalService.error('Ops', error);
      //   },
      // });
    }
  }
}
