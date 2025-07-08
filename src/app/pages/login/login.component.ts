
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { last } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isRegisterActive = false;

  loginData = {
    username: '',
    password: ''
  };

  registerData = {
    username: '',
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  };

  nombreUsuario: any;
  constructor(private authService: AuthService,private router:Router) {}

  onLogin() {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        alert('Inicio exitoso');
        sessionStorage.setItem('nombreUsuario', this.loginData.username);
        sessionStorage.setItem('userId', '19');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        const mensaje = err.error?.message || 'Error desconocido';
        const detalles = err.error?.details || '';
        
        if (detalles === 'usuario o contraseña incorrectos'){
          alert(`Credenciales incorrectas`);
        }else  {
          alert(`Ocurrió un problema, intente más tarde`);
          console.log('Error: ' , mensaje, 'Detalle: ', detalles);
        }
        
        

      }
    });
  }

  onRegister() {
      this.authService.register(this.registerData).subscribe({
          next: (response) => {
          alert('Registro exitoso!');
          this.router.navigate(['/home']);
          console.log('Respuesta:', response); 
          },
          error: (err) => {
            console.error('Error en registro:', err);
          }
      });
  }


}
