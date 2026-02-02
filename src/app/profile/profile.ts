import { Component, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ApiServices } from '../services/api-services';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-profile',
  imports: [Header, Footer, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  apiService = inject(ApiServices);

  imgURL:any = signal("https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740&q=80");

  username:string = "";
  userId :string = "";
  downloadedREcipes : any = signal([]);

  ngOnInit(){

    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user") || "");
      this.userId = user._id;
      this.username = user.username;
      user.picture && this.imgURL.set(`${this.apiService.server_url}/uploads/${user.picture}`);

      this.getUserDownloadedRecipes();
    }
  }

  uploadPicture(event : Event){
    const pictureInput = event.target as HTMLInputElement;
    if(pictureInput.files && pictureInput.files.length>0){
      const fileToUpload = pictureInput.files[0];
      const reqBody = new FormData();
      reqBody.append("picture",fileToUpload);
      console.log("Uploading image");
      
      this.apiService.updateUserProfileAPI(this.userId, reqBody).subscribe((res: any)=>{
        alert("Profile picture updated successfully!!");
        sessionStorage.setItem("user", JSON.stringify(res));
        this.imgURL.set(`${this.apiService.server_url}/uploads/${res.picture}`);
      })
    }
  }

  getUserDownloadedRecipes(){
    this.apiService.getUserDownloadedRecipesAPI().subscribe((res:any)=>{
      this.downloadedREcipes.set(res)
      console.log(this.downloadedREcipes());
      
    })
  }
}
