interface WeatherDetail {
    dt: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: string;
      sea_level: number;
      grnd_level: number;
      humidity: string;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: string;
      deg: number;
      gust: number;
    };
    visibility: string;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }
  
  export interface WeatherData {
    cod: string;
    message: number;
    cnt: number;
    list: WeatherDetail[];
    city: {
      id: number;
      name: string;
      coord: {
        lat: number;
        lon: number;
      };
      country: string;
      population: number;
      timezone: number;
      sunrise: number;
      sunset: number;
    };
  }