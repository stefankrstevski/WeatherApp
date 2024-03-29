import { Component, Input } from '@angular/core';
import { DailySummary } from '../models/daily-summary.model';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss',
})
export class WeatherCardComponent {
  @Input() dailyForecast!: DailySummary;
}
