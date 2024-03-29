import { Injectable, afterNextRender } from '@angular/core';
import { LoginModel } from '../../models/login.model';
import { RegisterModel } from '../../models/register.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authUrl = `${environment.apiUrl}/auth`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private router: Router, private http: HttpClient) {}

  login(loginModel: LoginModel): Observable<ApiResponse<string>> {
    return this.http
      .post<ApiResponse<string>>(
        `${this.authUrl}/login`,
        loginModel,
        this.httpOptions
      )
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
            localStorage.setItem('access_token', response.data);
          }
        })
      );
  }
  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }
  register(registerModel: RegisterModel): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      `${this.authUrl}/register`,
      registerModel,
      this.httpOptions
    );
  }
}
