import { Injectable } from '@angular/core';
import { CookieService, CookieOptions } from 'ngx-cookie';

@Injectable({
  providedIn: 'root',
})
export class CookieAccessService {
  constructor(private _cookieService: CookieService) {}

  getCookie(key: string) {
    return this._cookieService.get(key);
  }

  putCookie(key: string, value: string, options?: CookieOptions): void {
    this._cookieService.put(key, value, options);
  }

  clear() {
    this._cookieService.removeAll();
  }
}
