import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const expirationTime = parseInt(localStorage.getItem('loginExpiration') || '0', 10);
    const currentTime = new Date().getTime();

    if (!isLoggedIn || currentTime > expirationTime) {
     
      this.router.navigate(['/login']); // Redirect to login
      return false;
    }
    return true;
  }
}
