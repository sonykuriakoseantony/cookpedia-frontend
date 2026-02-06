import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServices } from '../../services/api-services';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  apiService = inject(ApiServices);
  router = inject(Router);
  sidebarOpen : boolean = true;
  userCount = signal<number>(0);
  recipeCount = signal<number>(0);
  downloadsCount = signal<number>(0);
  feedbacksCount = signal<number>(0);
  selected = new Date();
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title : {
        text : "Analysis of Download Recipes based on Cuisine Type",
        display : true
      }
    },
  };
  // barChartType = 'bar' as const;
  barChartData: ChartData<'bar'> = {
    labels: ['Italian', 'Asian', 'Mexican', 'Indian', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    ],
  };

  ngOnInit(){
    this.getUserCount();
    this.getRecipeCount();
    this.getDownloadsCount();
    this.getFeedbacksCount();
  }

  getUserCount(){
    this.apiService.getAllUsersAPI().subscribe((res:any)=>{
      this.userCount.set(res.length)
    })
  }

  getRecipeCount(){
    this.apiService.getAllRecipesAPI().subscribe((res:any)=>{
      this.recipeCount.set(res.length)
    })
  }

  getDownloadsCount(){
    this.apiService.getAllDownloadedRecipesAPI().subscribe((res:any)=>{
      const count = res.reduce((acc:any, cur:any) => acc+cur.count,0);
      this.downloadsCount.set(count)
    })
  }

  getFeedbacksCount(){
    this.apiService.getAllFeedbacksAPI().subscribe((res:any)=>{
      this.feedbacksCount.set(res.filter((item:any) => item.status == "pending").length);
    })
  }

  toggleSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
