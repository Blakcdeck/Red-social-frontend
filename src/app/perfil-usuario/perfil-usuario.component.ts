import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  usuario: any = {};
  currentUserId: number | null = null;
  constructor(private http: HttpClient,private authService:AuthService) { }

  ngOnInit() {
    
  this.currentUserId=this.authService.getCurrentUserId();
  this.http.get<any>(`http://localhost:8080/red-social/api/usuarios/${this.currentUserId}`)
  .subscribe({
    next: (data) => {
      this.usuario.nombreUsuario = data.username ?? 'Invitado';
      this.usuario.nombre = data.nombre;
      this.usuario.apellido = data.apellido;
      this.usuario.email = data.email;
    },
    error: (error) => {
      console.error('Error al obtener los datos del usuario', error);
      this.usuario.nombreUsuario = 'Invitado';
      this.usuario.nombre = '';
      this.usuario.apellido = '';
      this.usuario.email = '';
    }
  });

}
  
}
