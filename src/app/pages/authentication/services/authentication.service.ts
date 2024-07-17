import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '@services/supabase.service';
import { User } from '@supabase/supabase-js';
import { catchError, from, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // private auth = inject(Auth);
  private supabaseService = inject(SupabaseService);
  // private _utils = inject(UtilsService);

  persistense() {}

  signIn(email: string, password: string) {
    const credentials = { email, password };
    return from(
      this.supabaseService.client.auth.signInWithPassword(credentials),
    ).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error(error));
      }),
    );
  }

  signUp(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return from(this.supabaseService.client.auth.signUp(credentials)).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error(error));
      }),
    );
  }

  recoveryPassword(email: string) {
    return from(
      this.supabaseService.client.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:4200/auth',
      }),
    ).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error(error));
      }),
    );
  }

  changePassword(oobCode: string, newPassword: string) {
    return of();
    // return from(confirmPasswordReset(this.auth, oobCode, newPassword)).pipe(
    //   catchError((error) => {
    //     console.error(error);
    //     const errorMessage = this._utils.verifyErroCodeFireBase(error.code);
    //     return throwError(() => new Error(errorMessage));
    //   }),
    // );
  }

  // getAuthState() {
  //   return authState(this.auth).pipe(
  //     take(1),
  //     tap((value) => (value ? this.setAuthProps(value) : null)),
  //   );
  // }

  setAuthProps(props: {
    username: any;
    email: any;
    avatar_url: any;
    uid: any;
  }) {
    if (props.username) sessionStorage.setItem('username', props.username);
    if (props.avatar_url)
      sessionStorage.setItem('avatar_url', props.avatar_url);
    if (props.email) sessionStorage.setItem('email', props.email);
    if (props.uid) sessionStorage.setItem('uid', props.uid);
  }

  profile(user: User) {
    return this.supabaseService.client
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
  }

  verifyUserLogged() {
    return from(this.supabaseService.client.auth.getUser());
  }

  async getProfile() {
    try {
      const user = this.supabaseService.currentUser.getValue();
      if (user) {
        const {
          data: profile,
          error,
          status,
        } = await this.profile(user as User);

        if (error && status !== 406) {
          throw error;
        }

        if (profile) {
          this.setAuthProps({
            ...profile,
            uid: (user as User).id,
            email: (user as User).email,
          });
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }
}
