import { Component } from '@angular/core';
import { AuthService } from '../core/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}
  logout() {
    this.authService.logout();
  }
}
