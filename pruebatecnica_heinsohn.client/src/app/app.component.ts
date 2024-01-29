import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Util } from '../app/util/util-encrypt';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Util],
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  constructor(private http: HttpClient, private util: Util) { }

  ngOnInit() {
    
  }

  title = 'pruebatecnica_heinsohn.client';
}
