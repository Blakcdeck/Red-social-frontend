import { Component } from '@angular/core';
import { Usuario, UsuarioService } from '../../../services/usuario.service';
import { AmistadService } from '../../../services/amistad.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-busca-usuarios',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './busca-usuarios.component.html',
  styleUrl: './busca-usuarios.component.css'
})
export class BuscaUsuariosComponent {
  usuarios: Usuario[] = [];
  usuariosBuscados: Usuario[] = [];
  terminoBusqueda: string = '';
  usuarioActualId: number = 0; 
  cargando: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private amistadService: AmistadService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.usuarioActualId = this.authService.getCurrentUserId() || 0; // Obtener el ID del usuario actual
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.usuarioService.getAllUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios.filter(u => u.id !== this.usuarioActualId);
        this.usuariosBuscados = this.usuarios;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        this.cargando = false;
      }
    });
  }

  buscarUsuarios(): void {
    if (this.terminoBusqueda.trim() === '') {
      this.usuariosBuscados = this.usuarios;
      return;
    }

    this.cargando = true;
    this.usuarioService.buscarUsuarios(this.terminoBusqueda).subscribe({
      next: (usuarios) => {
        this.usuariosBuscados = usuarios.filter(u => u.id !== this.usuarioActualId);
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al buscar usuarios:', error);
        this.cargando = false;
      }
    });
  }

  enviarSolicitudAmistad(receptorId: number): void {
    this.amistadService.enviarSolicitudAmistad(this.usuarioActualId, receptorId).subscribe({
      next: (amistad) => {
        console.log('Solicitud de amistad enviada:', amistad);
        // Mostrar mensaje de éxito
        alert('Solicitud de amistad enviada correctamente');
      },
      error: (error) => {
        console.error('Error al enviar solicitud:', error);
        alert('Error al enviar solicitud de amistad');
      }
    });
  }

  limpiarBusqueda(): void {
    this.terminoBusqueda = '';
    this.usuariosBuscados = this.usuarios;
  }
}
