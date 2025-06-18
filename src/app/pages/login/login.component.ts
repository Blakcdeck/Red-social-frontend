
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
    name: '',
    lastname: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService,private router:Router) {}

  onLogin() {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {

        console.log('Login successful:', response);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });
  }

  onRegister() {
    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
      },
      error: (err) => {
        console.error('Registration failed:', err);
      }
    });
  }
}
