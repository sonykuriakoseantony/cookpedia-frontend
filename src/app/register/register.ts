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
      username : ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      email : ['',[Validators.required,Validators.email]],
      password : ['',[Validators.required,Validators.pattern('[a-zA-Z0-9!@#]*')]]
    })
  }

  register(){
    console.log("User registration submitted", this.registerForm.valid);
    if(this.registerForm.valid){
      this.isLoading = true;
      // const userData = this.registerForm.value;
      const username = this.registerForm.value.username;
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;
      console.log("User registration", username);
      this.apiService.registerAPI({username, email, password}).subscribe({
        next: (response: any) => {
          this.registerForm.reset();
          console.log("User registered successfully", response);
          alert("Registration successful! Please login.");
          this.router.navigate(['/login']);
          this.isLoading = false;
        },
        error: (reason: any) => {
          console.error("Registration error:", reason);
          alert(reason.error || "Registration failed. Please try again.");
          this.router.navigate(['/login']);
          this.isLoading = false;
        }
      });
    }
    else{
      alert("Invalid form data. Please fill valid data.")
    }
  }
}
