import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { WeatherResponse } from "./models";
import { Observable } from "rxjs";

const url = "/api/weather"

@Injectable()
export class WeatherService {

    constructor(
        private http : HttpClient
    ) {}

    getWeather(city : string, units = 'metric'): Observable<WeatherResponse[]> {
        const params = new HttpParams()
                        .set("city", city)
                        .set("units", units)

        return this.http.get<WeatherResponse[]>(`${url}`, {params })
    }
}