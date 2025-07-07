import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { Amistad, AmistadService } from '../../../services/amistad.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-amigos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-amigos.component.html',
  styleUrl: './lista-amigos.component.css'
})
export class ListaAmigosComponent {
  amigos: Amistad[] = [];
  solicitudesPendientes: Amistad[] = [];
  usuarioActualId: number = 0;
  cargando: boolean = false;
  mostrarSolicitudes: boolean = false;

  constructor(private amistadService: AmistadService, private authService:AuthService) { }

  ngOnInit(): void {
    this.usuarioActualId = this.authService.getCurrentUserId() || 0;
    this.cargarAmigos();
    this.cargarSolicitudesPendientes();
  }

  cargarAmigos(): void {
    this.cargando = true;
    this.amistadService.getAmigos(this.usuarioActualId).subscribe({
      next: (amigos) => {
        this.amigos = amigos;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar amigos:', error);
        this.cargando = false;
      }
    });
  }

  cargarSolicitudesPendientes(): void {
    this.amistadService.getSolicitudesPendientes(this.usuarioActualId).subscribe({
      next: (solicitudes) => {
        this.solicitudesPendientes = solicitudes;
      },
      error: (error) => {
        console.error('Error al cargar solicitudes pendientes:', error);
      }
    });
  }

  aceptarSolicitud(solicitudId: number): void {
    this.amistadService.aceptarSolicitudAmistad(solicitudId).subscribe({
      next: (amistad) => {
        console.log('Solicitud aceptada:', amistad);
        this.cargarAmigos();
        this.cargarSolicitudesPendientes();
      },
      error: (error) => {
        console.error('Error al aceptar solicitud:', error);
      }
    });
  }

  rechazarSolicitud(solicitudId: number): void {
    this.amistadService.rechazarSolicitudAmistad(solicitudId).subscribe({
      next: (amistad) => {
        console.log('Solicitud rechazada:', amistad);
        this.cargarSolicitudesPendientes();
      },
      error: (error) => {
        console.error('Error al rechazar solicitud:', error);
      }
    });
  }

  eliminarAmistad(solicitudId: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta amistad?')) {
      this.amistadService.eliminarAmistad(solicitudId).subscribe({
        next: () => {
          console.log('Amistad eliminada');
          this.cargarAmigos();
        },
        error: (error) => {
          console.error('Error al eliminar amistad:', error);
        }
      });
    }
  }

  toggleSolicitudes(): void {
    this.mostrarSolicitudes = !this.mostrarSolicitudes;
  }

  getNombreAmigo(amistad: Amistad): string {
    return amistad.usuarioSolicitante.id === this.usuarioActualId 
      ? amistad.usuarioSolicitante.nombre 
      : amistad.usuarioSolicitante.nombre;
  }

  getEmailAmigo(amistad: Amistad): string {
    return amistad.usuarioSolicitante.id === this.usuarioActualId 
      ? amistad.usuarioSolicitante.email 
      : amistad.usuarioSolicitante.email;
  }
}
