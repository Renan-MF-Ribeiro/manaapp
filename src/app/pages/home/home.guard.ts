import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@pages/authentication/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard {
  // private _supabaseService = inject(SupabaseService);
  private _authentication = inject(AuthenticationService);
  private _router = inject(Router);

  // canActivate(): Observable<boolean> {
  //   return this._authentication.verifyUserLogged().pipe(
  //     map((user) => {
  //       return !!user.data.user;
  //     }),
  //     tap((loggedIn) => {
  //       if (!loggedIn) {
  //         this._router.navigate(['/']);
  //       }
  //     }),
  //   );
  // }
}
