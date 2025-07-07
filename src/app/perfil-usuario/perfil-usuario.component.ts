import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  usuario: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit() {
  this.http.get<any>('http://localhost:8090/red-social/api/usuarios/31')
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
