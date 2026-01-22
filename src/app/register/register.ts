import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Footer } from '../footer/footer';
import { ApiServices } from '../services/api-services';
import { Router } from '@angular/router';

//approach is model driven forms (ReactiveFormsModule)
//creating a reactive form here

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, Footer],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  fb = inject(FormBuilder);
  registerForm : FormGroup
  apiService = inject(ApiServices);
  router = inject(Router);
  isLoading = false;

  constructor(){
    this.registerForm = this.fb.group({
      username : ['',Validators.required,Validators.pattern('[a-zA-Z ]*')],
      email : ['',Validators.required,Validators.email],
      password : ['',Validators.required,Validators.pattern('[a-zA-Z0-9]*')]
    })
  }

  register(){
    if(this.registerForm.valid){
      this.isLoading = true;
      const userData = this.registerForm.value;
      
      this.apiService.registerAPI(userData).subscribe({
        next: (response: any) => {
          console.log("User registered successfully", response);
          alert("Registration successful! Please login.");
          this.router.navigate(['/login']);
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error("Registration error:", error);
          alert(error.error || "Registration failed. Please try again.");
          this.isLoading = false;
        }
      });
    }
    else{
      alert("Invalid form data. Please fill valid data.")
    }
  }
}
