import axios from "axios";
import { useEffect, useState } from "react";

interface Weather {
  temp: number;
  desc: string;
  icon: string;
}

export default function WeatherInfo() {
  const [weather, setWeather] = useState<Weather>({
    temp: 0,
    desc: "",
    icon: "",
  });

  //#1 Promise의 then, fetch
  useEffect(() => {
    axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=35.2281&lon=128.6811&appid=b704c166f2ca95304640415f821a6164&units=metric"
    )
      .then((res) => {
        setWeather({
          temp: res.data.main.temp,
          desc: res.data.weather[0].description,
          icon: res.data.weather[0].icon
        })
        return weather;
      })
      .catch(err => console.log(err))
  }, []);

//#2 async/await(블로킹)으로 Promise 다루기
// const loadWeatherData = async () => {
//     const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=35.2281&lon=128.6811&appid=b704c166f2ca95304640415f821a6164&units=metric')
//     const data = await response.data;
//     setWeather({
//         temp: data.main.temp,
//         desc: data.weather[0].description,
//         icon: data.weather[0].icon
//     })
//     }

  useEffect(() => {
    //loadWeatherData();
    console.log(weather);
  }, [weather])
  
  return (
    <>
      <p>온도: {weather.temp} °C</p>
      <p>설명: {weather.desc}</p>
      {weather.icon && (
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.desc}
        />
      )}
    </>
  );
}
