import { inject, Injectable } from '@angular/core';
import { StorageService } from '@services/storage.service';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private _storage = inject(StorageService);

  getAllItems(): Observable<any> {
    return this._storage.get('items');
  }

  getItemById(id: string): Observable<any> {
    return this._storage.get('items');
  }

  createItem(item: any): Observable<any> {
    return this._storage.put('items', item);
  }

  updateItem(id: string, item: any): Observable<any> {
    return this._storage.put('items', item);
  }

  deleteItem(id: string): Observable<any> {
    return this._storage.delete('items');
  }
}
