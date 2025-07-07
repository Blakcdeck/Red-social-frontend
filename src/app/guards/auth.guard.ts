import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = !!sessionStorage.getItem('token'); // O el token que uses

    if (isAuthenticated) {
      return true;
    } else {
      // Usuario no autenticado, redirige al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
