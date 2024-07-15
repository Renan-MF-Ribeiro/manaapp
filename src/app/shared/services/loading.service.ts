import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _isShow = false;

  show() {
    this._isShow = true;
  }

  hide() {
    this._isShow = false;
  }

  getStatus(): boolean {
    return this._isShow;
  }
}
