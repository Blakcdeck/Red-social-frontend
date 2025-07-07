import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl = 'http://localhost:8090/red-social/api/auth';
  private loggedIn = new BehaviorSubject<boolean>(false); // Inicializa en false
  private nombreUsuario: string | undefined;

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      //const token = localStorage.getItem('token');
      const token = sessionStorage.getItem('token');
      this.loggedIn.next(!!token);
    }
  }
  getNombreUsuario(): string | undefined {
    return this.nombreUsuario;
  }

  setNombreUsuario(nombre: string) {
    this.nombreUsuario = nombre;
  }

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap((res: LoginResponse) => {
          if (typeof window !== 'undefined') {
            //localStorage.setItem('token', res.token);
            sessionStorage.setItem('token', res.token);
          }
          this.loggedIn.next(true);
        })
      );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/registro`, data, { responseType: 'text' });
  }

  obtUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/registro`, data, { responseType: 'text' });
  }

  logout() {
    if (typeof window !== 'undefined') {
      //localStorage.removeItem('token');
      sessionStorage.removeItem('token');

    }
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
