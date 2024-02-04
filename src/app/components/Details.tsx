import React from "react";
import { IoIosEye } from "react-icons/io";
import { IoWaterOutline } from "react-icons/io5";
import { WiStrongWind } from "react-icons/wi";
import { FaTachometerAlt } from "react-icons/fa";
import { TbSunrise } from "react-icons/tb";
import { TbSunset } from "react-icons/tb";

export interface SingleWeatherDetailProps {
  name: string;
  icon?: React.ReactNode;
  value: string;
}


export interface TypeDetailsProp {
    visibility:string;
    humidity:string;
    windSpeed:string;
    airPressure:string;
    sunrise:string;
    sunset:string;
}

const Details = (props: TypeDetailsProp) => {
  return (
    <>
    <SingleWeatherDetail name="Visibility" icon={<IoIosEye/>} value={props.visibility}/>
    <SingleWeatherDetail name="Humidity" icon ={<IoWaterOutline/>}value={props.humidity}/>
    <SingleWeatherDetail name="WindSpeed"  icon={<WiStrongWind/>} value={props.windSpeed}/>
    <SingleWeatherDetail name="AirPressure" icon={<FaTachometerAlt/>} value={props.airPressure}/>
    <SingleWeatherDetail name="Sunrise" icon={<TbSunrise/>} value={props.sunrise}/>
    <SingleWeatherDetail name="Sunset" icon={<TbSunset/>} value={props.sunset}/>
    </>
  )
}

export default Details

const SingleWeatherDetail=(props:SingleWeatherDetailProps)=>{
    return(
        <div className="flex flex-col gap-1 justify-center items-center" >
            <p className=" font-semibold ">{props.name}</p>
            <p className="text-prett text-3xl text-blue-400">{props.icon}</p>
            <p className="font-semibold text-gray-500">{props.value}</p>
        </div>
    )

}
