import { Component, OnInit } from '@angular/core';
import { WeatherResponse } from '../models';
import { Observable } from 'rxjs';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit{

  city: string =''
  weather$!: Observable<WeatherResponse[]>

  constructor(
    private weatherSvc : WeatherService,
    private activatedRoute : ActivatedRoute,
    private title : Title
  ) {}

  ngOnInit(): void {
      this.city = this.activatedRoute.snapshot.params['city']
      const units = this.activatedRoute.snapshot.queryParams['units'] || 'metric'

      this.title.setTitle(`Weather in ${this.city}`)

      this.weather$ = this.weatherSvc.getWeather(this.city, units)
  }


}
