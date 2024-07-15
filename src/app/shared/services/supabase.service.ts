import { Injectable } from '@angular/core';
import {
  AuthSession,
  SupabaseClient,
  User,
  createClient,
} from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  currentUser: BehaviorSubject<User | boolean> = new BehaviorSubject<
    User | boolean
  >(false);

  _session: AuthSession | null = null;

  constructor() {
    this.supabase = createClient(environment.url, environment.key);

    this.supabase.auth.onAuthStateChange((event, sess) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        this.currentUser.next(sess ? sess.user : false);
      } else {
        this.currentUser.next(false);
      }
    });
  }

  get client(): SupabaseClient {
    return this.supabase;
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }
}
