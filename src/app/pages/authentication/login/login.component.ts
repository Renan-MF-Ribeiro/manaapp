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
import { LoadingService } from '@services/loading.service';
import { RouterModule } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';

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
  private _loading = inject(LoadingService);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    // this._supabaseService.currentUser.subscribe((user) => {
    //   if (!!user) {
    //     this._router.navigate(['/home']);
    //     this._authenticationService.getProfile();
    //   }
    // });
  }

  login() {
    this._loading.show();
    if (this.form.valid) {
      // this._authenticationService
      //   .signIn(value.email!, value.password!)
      //   .subscribe({
      //     next: (data) => {
      //       if (data.error) {
      //         this._loading.hide();
      //         console.error(data.error.message);
      //         this._swalService.error('Ops', 'Usuário ou senha inválidos');
      //       } else {
      //         this._loading.hide();
      //         this._router.navigate(['home']);
      //       }
      //     },
      //     error: (error) => {
      //       this._loading.hide();
      //       console.error(error);
      //       this._swalService.error('Ops', error);
      //     },
      //   });
    }
  }
  // logout() {
  //   this.afAuth.signOut();
  // }
}
