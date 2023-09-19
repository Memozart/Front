import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AppState } from '../stores';
import { signOutAction } from '../stores/user.actions';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private router: Router,
    public store: Store<AppState>,
  ) { }

  stepSequence = environment.isDemo ? 
  {
    timeSequence: 'minute(s)'
  }:
  {
    timeSequence: 'jour(s)'
  }

  logoutBehavior(){
    localStorage.clear();
    this.store.dispatch(signOutAction());
    this.router.navigate(['login']);
  }
}
