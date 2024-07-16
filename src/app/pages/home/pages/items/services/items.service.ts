import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '@services/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private _supabase = inject(SupabaseService);
  supabase!: SupabaseClient;
  constructor() {
    this.supabase = this._supabase.client;
  }

  getAllItems(): Observable<any> {
    return from(this.supabase.from('menu_items').select('*'));
  }

  getItemById(id: string): Observable<any> {
    return from(
      this.supabase.from('menu_items').select('*').eq('id', id).single(),
    );
  }

  createItem(item: any): Observable<any> {
    return from(this.supabase.from('menu_items').insert([item]));
  }

  updateItem(id: string, item: any): Observable<any> {
    return from(this.supabase.from('menu_items').update(item).eq('id', id));
  }

  deleteItem(id: string): Observable<any> {
    return from(this.supabase.from('menu_items').delete().eq('id', id));
  }
}
