import { Component } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [CommonModule, HttpClientModule],
  providers: [DashboardService],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  responseText: string = '';
	constructor(private dashboardService: DashboardService) {}

  callSecureApi() {
    const exampleData = { key: 'Sample data' }; // Example data to send
    this.dashboardService.performSecureAction(exampleData).subscribe({
      next: (response) => {
        console.log('Secure API response:', response);
        this.responseText = JSON.stringify(response, null, 2);
      },
      error: (error) => {
        console.error('Error calling secure API:', error);
        this.responseText = 'Failed to call secure API';
      },
    });
  }
}
