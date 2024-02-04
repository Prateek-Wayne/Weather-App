import React from "react";
import axios from "axios";
import { WeatherData } from "../utils/type";
import { useQuery } from "@tanstack/react-query";
import { format, fromUnixTime, parseISO } from "date-fns";
import Container from "./Container";
import { kelvinTodegree } from "../utils/kelvinToDegree";
import WeatherIcon from "./WeatherIcon";
import { getDayOrNightIcon } from "../utils/getDayOrNightIcon";
import Details from "./Details";

type Props = {};

const MainPage = (props: Props) => {
  const { isPending, error, data } = useQuery<WeatherData>({
    queryKey: ["repoData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=jaipur&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    },
  });
  console.log(data);
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
          <Container>
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
            <Container className="w-fit flex-col justify-center mr-4 items-center px-4">
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
                visibility={firstData?.visibility ?? "0"}
                windSpeed={firstData?.wind.speed ?? "0"}
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
      <section></section>
    </div>
  );
};

export default MainPage;
