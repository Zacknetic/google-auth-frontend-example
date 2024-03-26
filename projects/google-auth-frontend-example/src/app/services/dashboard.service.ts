import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
interface OperationLogResponse {
  operationLogs: { username: string; operation: string; accessTime: string }[];
}
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'https://4d7bd6a28bcfd37d.ngrok.app/api/example';

  constructor(private http: HttpClient) { }

  fetchProductCalc(exampleData: any): Observable<any> {
    const token = localStorage.getItem('token'); // no need to get token for non-secure API
    let headers = {};
    if (token) {
      headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    }


    return this.http.post(`${this.apiUrl}/calc-product`, exampleData, { headers });
  }

  fetchLogs(): Observable<OperationLogResponse> {
    const token = localStorage.getItem('token'); // no need to get token for non-secure API
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<OperationLogResponse>(`${this.apiUrl}/get-logs`, {}, { headers })
  }
}