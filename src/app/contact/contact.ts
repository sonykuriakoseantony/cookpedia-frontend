import { Component, inject } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ApiServices } from '../services/api-services';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [Header, Footer, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

  
  apiService = inject(ApiServices);
  name : string = "";
  email : string = "";
  message : string = "";

  submitFeedback(){
    if(this.name && this.email && this.message){
      this.apiService.addFeedbackAPI({name : this.name, email : this.email, message : this.message}).subscribe((res:any) => {
      alert("Thank you for your feedback! We appreciate your effort to help us improve.");
      this.name = "";
      this.email = "";
      this.message = "";
    })
    }
    else{
      alert("Fill teh form completely")
    }
  }
}
