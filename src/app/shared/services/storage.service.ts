import { Injectable } from '@angular/core';
import { MenuItem } from '@pages/home/pages/items/models/item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  get(key: string) {
    const result = new BehaviorSubject<MenuItem | null>(null);
    const value = localStorage.getItem(key);
    result.next(JSON.parse(value ?? '{}'));
    return result;
  }

  put(key: string, value: MenuItem) {
    const result = new BehaviorSubject<MenuItem | null | string>(null);
    localStorage.setItem(key, JSON.stringify(value));
    result.next(value);
    return result;
  }

  delete(key: string) {
    const result = new BehaviorSubject<MenuItem | null | string>(null);
    localStorage.removeItem(key);
    result.next('deleted');
    return result;
  }
}
