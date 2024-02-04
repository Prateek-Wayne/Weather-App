import React from 'react'
import Container from './Container';
import WeatherIcon from './WeatherIcon';
import Details, { TypeDetailsProp } from './Details';
import { kelvinTodegree } from '../utils/kelvinToDegree';

export interface ForecastWeatherDetailProps extends TypeDetailsProp {
    weatherIcon: string;
    date: string;
    day: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    description: string;
  }

const ForeCastWeather = (props: ForecastWeatherDetailProps) => {

    const {
        weatherIcon = "02d",
        date = "19.09",
        day = "Tuesday",
        temp,
        feels_like,
        temp_min,
        temp_max,
        description
      } = props;

  return (
    <Container className="gap-4 bg-pink-100">
    {/* left */}
    <section className=" flex gap-4 items-center px-4  ">
      <div className=" flex flex-col gap-1 items-center">
        <WeatherIcon iconName={weatherIcon} />
        <p>{date}</p>
        <p className="text-sm">{day} </p>
      </div>

      {/*  */}
      <div className="flex flex-col px-4">
        <span className="text-5xl">{kelvinTodegree(temp ?? 0)}°</span>
        <p className="text-xs space-x-1 whitespace-nowrap">
          <span> Feels like</span>
          <span>{kelvinTodegree(feels_like ?? 0)}°</span>
        </p>
        <p className="capitalize"> {description}</p>
      </div>
    </section>
    {/* right */}
    <section className=" overflow-x-auto flex justify-between gap-4 px-4  w-full pr-10">
      <Details {...props} />
    </section>
  </Container>
  )
}

export default ForeCastWeather;