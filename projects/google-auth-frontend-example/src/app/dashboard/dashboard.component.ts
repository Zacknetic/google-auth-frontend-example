import { Component } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
interface OperationLogResponse {
  operationLogs: { username: string; operation: string; accessTime: string }[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTableModule
  ],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  calcText: any; // Adjusted to `any` for simplicity, consider creating a specific interface
  logsText: any[] = []; // Assuming it will be an array of log entries
  errorText: string = '';
  num1: number = 6;
  num2: number = 7;
  displayedColumns: string[] = ['username', 'operation', 'accessTime'];

  constructor(private dashboardService: DashboardService) { }
  
  getLogs() {
    this.dashboardService.fetchLogs().subscribe({

      next: (response: OperationLogResponse) => {
        this.logsText = response.operationLogs;
        this.errorText = '';
      },
      error: (error) => {
        this.errorText = 'Must authenticate before calling this API';
        this.logsText = [];
      },
    });
  }
  

  callCalcApi() {
    const exampleData = { productRequestExample: { num1: this.num1, num2: this.num2 } };
    this.dashboardService.fetchProductCalc(exampleData).subscribe({
      next: (response) => {
        this.calcText = response.productResponseExample; // Directly use the object
        this.errorText = '';
      },
      error: (error) => {
        this.errorText = 'Error calling calc API';
        this.calcText = null;
      },
    });
  }
}
