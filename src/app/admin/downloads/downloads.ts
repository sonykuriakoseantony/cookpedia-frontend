import { Component, inject, signal } from '@angular/core';
import { ApiServices } from '../../services/api-services';

@Component({
  selector: 'app-downloads',
  standalone: false,
  templateUrl: './downloads.html',
  styleUrl: './downloads.css',
})
export class Downloads {
  allDownloads : any = signal([]);
  apiService = inject(ApiServices);

  ngOnInit(){
    this.getAllDownloads();
  }

  getAllDownloads(){
    this.apiService.getAllDownloadedRecipesAPI().subscribe((res:any)=>{
      this.allDownloads.set(res);

      console.log(this.allDownloads());
      
    })
  }
}
