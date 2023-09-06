import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router) {}

  tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  canActivate(): boolean {
    const token = localStorage.getItem('access_token') || '';
    if (token && !this.tokenExpired(token)) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
