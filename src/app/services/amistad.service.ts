import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Amistad {
  id: number;
  solicitante: any; // Usuario que envía la solicitud
  receptor: any; // Usuario que recibe la solicitud
  estado: 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA';
  fechaCreacion: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AmistadService {
  private baseUrl = 'http://localhost:8080/red-social/api/amistades';

  constructor(private http: HttpClient) { }

  enviarSolicitudAmistad(solicitanteId: number, receptorId: number): Observable<Amistad> {
    return this.http.post<Amistad>(`${this.baseUrl}/solicitar/${solicitanteId}/${receptorId}`, {});
  }

  aceptarSolicitudAmistad(solicitudId: number): Observable<Amistad> {
    return this.http.put<Amistad>(`${this.baseUrl}/aceptar/${solicitudId}`, {});
  }

  rechazarSolicitudAmistad(solicitudId: number): Observable<Amistad> {
    return this.http.put<Amistad>(`${this.baseUrl}/rechazar/${solicitudId}`, {});
  }

  getSolicitudesPendientes(usuarioId: number): Observable<Amistad[]> {
    return this.http.get<Amistad[]>(`${this.baseUrl}/pendientes/${usuarioId}`);
  }

  getAmigos(usuarioId: number): Observable<Amistad[]> {
    return this.http.get<Amistad[]>(`${this.baseUrl}/amigos/${usuarioId}`);
  }

  eliminarAmistad(solicitudId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eliminar/${solicitudId}`);
  }
}