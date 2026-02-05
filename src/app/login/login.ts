import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Footer } from '../footer/footer';
import { ApiServices } from '../services/api-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Footer],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  fb = inject(FormBuilder);
  loginForm: FormGroup;
  apiService = inject(ApiServices);
  router = inject(Router);
  isLoading = false;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9!@#]*')]]
    });
  }

  login() {
    console.log("User login submitted", this.loginForm.valid);
    if (this.loginForm.valid) {
      this.isLoading = true;
      const userData = this.loginForm.value;

      this.apiService.loginAPI(userData).subscribe({
        next: (response: any) => {
          console.log("User logged in successfully", response);
          // Store user data in localStorage
          sessionStorage.setItem('user', JSON.stringify(response.user));
          sessionStorage.setItem('token', response.token);
          alert("Login successful!");
          if(response.user.role == 'user'){
            this.router.navigate(['/']);
          }
          else{
            this.router.navigate(['/admin']);
          }
          
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error("Login error:", error);
          alert(error.error || "Login failed. Please check your credentials.");
          this.isLoading = false;
        }
      });
    } else {
      alert("Invalid form data. Please fill valid data.");
    }
  }
}
