import React, { useEffect } from "react";
import axios from "axios";
import { WeatherData } from "../utils/type";
import { useQuery } from "@tanstack/react-query";
import { format, fromUnixTime, parseISO } from "date-fns";
import Container from "./Container";
import { kelvinTodegree } from "../utils/kelvinToDegree";
import WeatherIcon from "./WeatherIcon";
import Details from "./Details";
import ForeCastWeather from "./ForeCastWeather";
import {
  convertWindSpeed,
  metersToKilometers,
  getDayOrNightIcon,
} from "../utils/weatherUtils";
import { useAtom } from "jotai";
import { placeAtom } from "../atom";

type Props = {};

const MainPage = (props: Props) => {
  const [place, setPlace] = useAtom(placeAtom);
  console.log("Inside the main page : ", place);
  const { isPending, error, data, refetch } = useQuery<WeatherData>({
    queryKey: ["repoData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    },
  });
  useEffect(() => {
    refetch();
  }, [place, refetch]);
  // console.log(data);

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(Number(entry.dt) * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  // Filtering data to get the first entry after 6 AM for each unique date
  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(Number(entry.dt) * 1000)
        .toISOString()
        .split("T")[0];
      const entryTime = new Date(Number(entry.dt) * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });
  const firstData = data?.list[0];
  if (isPending) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <h1 className="animate-bounce text-gray-700">loading....</h1>
      </div>
    );
  }

 

  return (
    <div>
      {/* today data */}
      <section>
        <div>
          <h2 className="flex gap-1 text-2xl items-end">
            <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
            <p className="text-gray-500">
              {format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")}
            </p>
          </h2>
          <Container className="bg-yellow-50">
            {/* temperature */}
            <div className="flex flex-col px-4 gap-1">
              <p className="text-6xl text-gray-500">
                {kelvinTodegree(firstData?.main?.temp ?? 273)}°{" "}
              </p>
              <span className="text-sm text-gray-400">
                feels like {kelvinTodegree(firstData?.main?.feels_like ?? 273)}°
              </span>
              <p className="flex justify-star gap-1 text-gray-600 ">
                <span>
                  {kelvinTodegree(firstData?.main?.temp_min ?? 273)}°⬇️
                </span>
                <span>
                  {kelvinTodegree(firstData?.main?.temp_max ?? 273)}⬆️
                </span>
              </p>
            </div>

            {/* time and forecast */}
            <div className="flex w-full overflow-x-auto gap-10 sm:gap-16 justify-between pr-3 ">
              {data?.list.map((d, i) => {
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center text-xs font-semibold"
                  >
                    <p className="whitespace-nowrap py-1">
                      {format(parseISO(d?.dt_txt), "h:mm a")}
                    </p>
                    {/* <WeatherIcon iconName={d?.weather[0].icon}/> */}
                    <WeatherIcon
                      iconName={getDayOrNightIcon(
                        d?.weather[0].icon,
                        d?.dt_txt
                      )}
                    />
                    <p className="text-gray-500">
                      {kelvinTodegree(d?.main?.temp)}°
                    </p>
                  </div>
                );
              })}
            </div>
          </Container>
          {/* extra */}
          <div className="flex py-5">
            {/* left  */}
            <Container className="w-fit flex-col justify-center mr-4 items-center px-4 bg-pink-200">
              <p className=" capitalize text-center font-semibold mt-3">
                {firstData?.weather[0].description}{" "}
              </p>
              <WeatherIcon
                iconName={getDayOrNightIcon(
                  firstData?.weather[0].icon ?? "",
                  firstData?.dt_txt ?? ""
                )}
              />
            </Container>
            {/* Right  */}
            <Container className="bg-yellow-300 shadow-sm justify-between gap-2 px-4 flex">
              <Details
                visibility={`${metersToKilometers(
                  firstData?.visibility ?? 10000
                )} `}
                windSpeed={`${convertWindSpeed(
                  firstData?.wind.speed ?? 1.64
                )} `}
                humidity={firstData?.main?.humidity ?? "0"}
                airPressure={firstData?.main.pressure ?? "0"}
                sunrise={format(
                  fromUnixTime(data?.city.sunrise ?? 1702949452),
                  "H:mm"
                )}
                sunset={format(
                  fromUnixTime(data?.city.sunset ?? 1702517657),
                  "H:mm"
                )}
              />
            </Container>
          </div>
        </div>
      </section>
      {/* seven days forcast   */}
      <section className=" flex flex-col gap-3 ">
        <p className="text-2xl font-medium">Forcast (7 Days) </p>

        {/* // iterating over data... */}
        {firstDataForEachDate.map((d, i) => (
          <ForeCastWeather
            key={i}
            description={d?.weather[0].description ?? ""}
            weatherIcon={d?.weather[0].icon ?? "01d"}
            date={format(parseISO(d?.dt_txt ?? ""), "dd.MM")}
            day={format(parseISO(d?.dt_txt ?? ""), "EEEE")}
            feels_like={d?.main.feels_like ?? 0}
            temp={d?.main.temp ?? 0}
            temp_max={d?.main.temp_max ?? 0}
            temp_min={d?.main.temp_min ?? 0}
            airPressure={`${d?.main.pressure} hPa `}
            humidity={`${d?.main.humidity}% `}
            sunrise={format(
              fromUnixTime(data?.city.sunrise ?? 1702517657),
              "H:mm"
            )}
            sunset={format(
              fromUnixTime(data?.city.sunset ?? 1702517657),
              "H:mm"
            )}
            visibility={`${metersToKilometers(d?.visibility ?? 10000)} `}
            windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)} `}
          />
        ))}
      </section>
    </div>
  );
};

export default MainPage;
