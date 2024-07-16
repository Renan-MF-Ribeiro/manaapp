import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SupabaseService } from '@services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate {
  private _supabaseService = inject(SupabaseService);
  private _router = inject(Router);

  canActivate(): Observable<boolean> {
    return this._supabaseService.currentUser.pipe(
      map((user) => {
        return !!user;
      }),
      tap((loggedIn) => {
        if (!loggedIn) {
          this._router.navigate(['/']);
        }
      }),
    );
  }
}
