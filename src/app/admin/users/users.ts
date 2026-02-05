import { Component, inject, signal } from '@angular/core';
import { ApiServices } from '../../services/api-services';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  allUsers : any = signal([]);
  apiService = inject(ApiServices);

  ngOnInit(){
    this.getAllUsers();
  }

  getAllUsers(){
    this.apiService.getAllUsersAPI().subscribe((res:any)=>{
      this.allUsers.set(res);
      console.log(this.allUsers());
    })
  }
}
