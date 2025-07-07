import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent, NgIf],
  templateUrl: './app.component.html',
})
export class AppComponent {
  mostrarMenu = false;

  constructor(private authService: AuthService) {
    
    
    // Verifica que el código se ejecuta en el navegador
    if (typeof window !== 'undefined' && sessionStorage) {
      //const token = localStorage.getItem('token');
      const token = sessionStorage.getItem('token');
      this.mostrarMenu = !!token;
      console.log('TOKEN LOCALSTORAGE:', token);
    }else{

      console.log('No hay token sr');
    }

    // Suscripción para cambios futuros (login/logout)
    this.authService.isLoggedIn().subscribe(logged => {
      this.mostrarMenu = logged;
    });


  }
}
