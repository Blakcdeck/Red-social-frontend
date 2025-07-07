import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;  

}
interface DecodedToken {
  id: number;
  role: string;
  sub: string;
  exp: number;
  iat: number;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/red-social/api/auth'; 

  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return new Observable<LoginResponse>((observer) => {
      this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          observer.next(response);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }


  register(data: { username: string; name: string; lastname: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/registro`, data);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      console.log('Token decodificado:', decoded);
      return decoded.id;
    } catch (e) {
      console.error('Token inválido o malformado:', e);
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
