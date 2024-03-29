import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WeatherService } from '../core/Services/weather.service';
import { DailySummary } from '../models/daily-summary.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  searchForm: FormGroup = new FormGroup({
    searchTerm: new FormControl(''),
  });

  weekForecast: DailySummary[] | undefined;

  constructor(
    private weatherService: WeatherService,
    private toastr: ToastrService
  ) {}

  weather(city: string) {
    this.weatherService.weather(city).subscribe({
      next: (response) => {
        if (response.success) {
          this.weekForecast = response.data;
        } else {
          const errorMessage =
            response.errors && response.errors.length > 0
              ? response.errors[0]
              : response.message || 'An unexpected error occurred.';
          this.toastr.error(errorMessage, 'City fetch failed');
        }
      },
      error: (error) => {
        const errorMessage =
          error.errors && error.errors.length > 0
            ? error.errors[0]
            : error.message || 'An unexpected error occurred.';
        this.toastr.error(errorMessage, 'Error');
      },
    });
  }

  async onSearch() {
    const searchTerm = this.searchForm.value.searchTerm;
    this.weather(searchTerm);
  }
}
