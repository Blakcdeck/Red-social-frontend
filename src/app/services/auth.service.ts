import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;  

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/red-social/api/auth'; 

  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials);
  }

  register(data: { username: string; name: string; lastname: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/registro`, data);
  }
}
