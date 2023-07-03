export interface WeatherApi {
    city: string
    units: string
}

export interface WeatherResponse {
    main: string
    description: string
    icon: string
}