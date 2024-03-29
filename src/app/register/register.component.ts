import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../core/Services/auth.service';

interface RegisterModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerModel: RegisterModel = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  submitted = false; 

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit(registerForm: NgForm) {
    this.submitted = true; 

    if (registerForm.valid && this.registerModel.password === this.registerModel.confirmPassword) {
      this.authService.register(registerForm.value).subscribe({
        next: (response) => {
          if (response.success) {
            this.toastr.success('Registration successful');
            this.router.navigate(['/']);
          } else {
            const errorMessage = response.errors && response.errors.length > 0
              ? response.errors[0]
              : response.message || 'An unexpected error occurred.';
            this.toastr.error(errorMessage, 'Registration failed');
          }
        },
        error: (error) => {
          const errorMessage = error.errors && error.errors.length > 0
            ? error.errors[0]
            : error.message || 'An unexpected error occurred.';
          this.toastr.error(errorMessage, 'Registration failed');
        },
      });
    } else {
      this.toastr.error('Enter the required fields.', 'Validation Error');
    }
  }
}
