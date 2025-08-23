import React from 'react';
import styles from "./Weather.module.scss"
import {Card, CardBody, CardText} from "react-bootstrap";
import PositionSvg from "../Svgs/PositionSvg";
import DefaultWeather from "../Svgs/DefaultWeather";
import Thermometer from "../Svgs/Thermometer";
import Time from "../Svgs/Time";
import Wind from "../Svgs/Wind";
import {useSelector,useDispatch} from "react-redux";
import Moment from "react-moment";
import Speedometer from "../Svgs/Speedometer";
import Humidity from "../Svgs/Humidity";
import {Switch} from "@mui/material";
import {resetData, setUnity} from "../../features/weather/WeatherSlice";
import Sunny from "../Svgs/Sunny";
import Cloudy from "../Svgs/Cloudy";
import LightRain from "../Svgs/LightRain";
import Rainy from "../Svgs/Rainy";
import Rain from "../Svgs/RainySunny";
import RainySunny from "../Svgs/RainySunny";
import Thunder from "../Svgs/Thunder";


const Weather = () => {
    const defaultHeight = '200px';
    const defaultWidth = '200px';
    const weather = useSelector(({weather}) => weather);
    const displayIcon = () => {
        const number = weather.weather.icon.substring(0,2);
        switch (number) {
            case '02':
                return <Sunny width={defaultWidth} height={defaultHeight}/>
            case '03':
            case '04':
                return <Cloudy width={defaultWidth} height={defaultHeight}/>
            case '10':
                return <Rainy width={defaultWidth} height={defaultHeight}/>
            case '11':
                return <Thunder width={defaultWidth} height={defaultHeight}/>
            default:
               return  <img src={`https://openweathermap.org/img/wn/${weather.weather.icon}@2x.png`}/>
        }
    }

    const sunriseTime = new Date((weather.sys.sunrise + weather.timezone) * 1000);
    const sunriseStr = sunriseTime.getUTCHours().toString().padStart(2,'0')
        + ':' + sunriseTime.getUTCMinutes().toString().padStart(2,'0');

    const cityTime = new Date((weather.dt + weather.timezone) * 1000);
    const hours = cityTime.getUTCHours().toString().padStart(2,'0');
    const minutes = cityTime.getUTCMinutes().toString().padStart(2,'0');
    const localTimeStr = `${hours}:${minutes}`;



    const dispatch = useDispatch();
    const getGreeting = () => {
        if (!weather.dt || !weather.timezone) return "";

        // Heure locale de la ville
        const cityHour = new Date((weather.dt + weather.timezone) * 1000).getUTCHours();

        if (cityHour >= 6 && cityHour < 12) return "Good Morning";
        if (cityHour >= 12 && cityHour < 18) return "Good Afternoon";
        if (cityHour >= 18 && cityHour < 21) return "Good Evening";
        return "Good Night";
    };

    return (<>
        <Card className={styles.container}>
            {weather.isLoaded ?
                <Card.Body>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px'}}>
                        <span style={{color: '#fff'}}>Imperial</span>
                        <Switch
                            checked={weather.unity === 'imperial'}
                            onChange={(e) => {
                                const newUnit = e.target.checked ? 'imperial' : 'metric';
                                dispatch(setUnity(newUnit));
                            }}
                        />
                    </div>


                    <Card.Title>
                        {weather.name}, {weather.sys.country} <PositionSvg color={'rgba(255,255,255,0.7)'} />

                        <div className={styles.date}>
                            {weather.isLoaded && weather.dt && weather.timezone ? (() => {
                                // Heure et date locales
                                const cityTime = new Date((weather.dt + weather.timezone) * 1000);
                                const hours = cityTime.getUTCHours().toString().padStart(2, '0');
                                const minutes = cityTime.getUTCMinutes().toString().padStart(2, '0');
                                const localTimeStr = `${hours}:${minutes}`;
                                const day = cityTime.getUTCDate().toString().padStart(2,'0');
                                const month = (cityTime.getUTCMonth()+1).toString().padStart(2,'0');
                                const year = cityTime.getUTCFullYear();
                                const localDateStr = `${day}/${month}/${year}`;

                                return (
                                    <>
                                        <div>{localDateStr}</div>
                                        <div>{localTimeStr}</div>
                                    </>
                                );
                            })() : (
                                <div>Loading...</div>
                            )}
                            <div><Time width={'15px'} height={'15px'} /></div>
                        </div>
                    </Card.Title>


                    <CardText as={'div'} className={styles.weather_infos}>
                        <div>
                            {displayIcon()}
                        </div>
                        <div className={styles.temperature}>
                            <div>{weather.main.feels_like} {(weather.unity === "metric") ? "°C" : "°F"}</div>
                            <div><Thermometer width={'40px'} height={'40px'} color={'#FFFF00'}/></div>
                        </div>
                        <div>
                            {getGreeting()} {weather.name}
                            <div className={styles.separator}></div>
                        </div>

                        <div className={styles.infos}>
                            <div className={styles.border_right}>
                                <div><DefaultWeather color={'#fff'}/></div>
                                <div>Sunrise</div>
                                <div>
                                    <div>
                                        {sunriseStr}
                                    </div>

                                </div>
                            </div>
                            <div className={styles.border_right}>
                                <div><Wind/></div>
                                <div>Wind</div>
                                <div>{weather.wind.speed} {(weather.unity === "metric") ? "m/s" : "mph"}</div>
                            </div>
                            <div className={styles.border_right}>
                                <div><Speedometer color={'#fff'}/></div>
                                <div>Pressure</div>
                                <div>{weather.main.pressure} hPa</div>
                            </div>
                            <div className={styles.border_right}>
                                <div><Humidity color={'#fff'}/></div>
                                <div>Humidity</div>
                                <div>{weather.main.humidity}%</div>
                            </div>
                            <div>
                                <div><Thermometer width={'25px'} height={'25px'}  color={'#fff'}/></div>
                                <div>Temp</div>
                                <div>{weather.main.temp} {(weather.unity === "metric") ? "°C" : "°F"}</div>
                            </div>
                        </div>
                    </CardText>
                </Card.Body>
                : <Card.Body>
                    <Card.Title>Please choose your city.</Card.Title>
                </Card.Body>
            }
        </Card>


    </>);
};
export default Weather;