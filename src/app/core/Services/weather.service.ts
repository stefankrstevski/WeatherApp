import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DailySummary } from '../../models/daily-summary.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  apiUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  weather(city: string): Observable<ApiResponse<DailySummary[]>> {
    return this.http.get<ApiResponse<DailySummary[]>>(
      `${this.apiUrl}/weather/week-summary?cityName=${encodeURIComponent(city)}`,
      this.httpOptions
    );
  }
}
