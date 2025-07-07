import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true
})
export class NavbarComponent {
  nombreUsuario: any;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    //const nombre = localStorage.getItem('nombreUsuario');
    const nombre = sessionStorage.getItem('nombreUsuario');
    console.log('NOMBRE DEL USUARIO LOCALSTORAGE: ' , nombre);
    this.nombreUsuario = nombre ?? 'Invitado';
  }

  logout() {
    //localStorage.removeItem('token_value');// Elimina la clave del token
    sessionStorage.removeItem('token');
    //localStorage.clear();
    sessionStorage.clear
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  Openperfil(){
    this.router.navigate(['/perfil']);
  }

   OpenHome(){
    this.router.navigate(['/home']);
  }
}
