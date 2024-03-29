import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../core/Services/auth.service';
import { LoginModel } from '../models/login.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginModel: LoginModel = { email: '', password: '' };
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  async onSubmit(form: NgForm) {
    this.submitted = true;

    this.authService.login(form.value).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/']);
          this.toastr.success('Login successful');
        } else {
          const errorMessage =
            response.errors && response.errors.length > 0
              ? response.errors[0]
              : response.message || 'An unexpected error occurred.';
          this.toastr.error(errorMessage, 'Login failed');
        }
      },
      error: (error) => {
        const errorMessage =
          error.errors && error.errors.length > 0
            ? error.errors[0]
            : error.message || 'An unexpected error occurred.';
        this.toastr.error(errorMessage, 'Login failed');
      },
    });
  }
}
