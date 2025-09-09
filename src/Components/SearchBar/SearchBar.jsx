import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import styles from "./SearchBar.module.scss";
import {Autocomplete, Button, TextField} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setData, resetData } from "../../features/weather/WeatherSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import PositionSvg from "../Svgs/PositionSvg";

function SearchBar() {
    const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY;
    const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const dispatch = useDispatch();
    const unity = useSelector((state) => state.weather.unity);

    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [geoLocation, setGeoLocation] = useState(undefined);
    const [geoError, setGeoError] = useState(false);
    const [geoAllowed, setGeoAllowed] = useState(true); // par défaut activé


    const getGeolocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setSelectedCity(null);
                setGeoError(false);
                setGeoLocation({
                    lon: position.coords.longitude,
                    lat: position.coords.latitude,
                });
            },
            (error) => {
                console.log("GEO ERROR", error);
                if (error.code === error.PERMISSION_DENIED) {
                    alert("Location access was denied. Please enable it in your browser settings.");
                }
                setGeoError(true);
                setGeoLocation(undefined);
            }
        );
    };




    const fetchWeather = (lat, lon) => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unity}&appid=${WEATHER_API_KEY}`
        )
            .then((res) => res.json())
            .then((data) => {
                const { clouds, main, name, sys, weather, wind, timezone, dt } = data;
                dispatch(setData({ clouds, main, name, sys, weather, wind ,timezone, dt }));
            });
    };

    useEffect(() => {
        if (navigator.permissions) {
            navigator.permissions.query({ name: "geolocation" }).then((result) => {
                if (result.state === "denied") {
                    setGeoAllowed(false); // désactivé dans le navigateur
                }
            });
        }
    }, []);

    useEffect(() => {
        if (selectedCity) {
            fetchWeather(selectedCity.lat, selectedCity.lon);
        } else if (geoLocation) {
            fetchWeather(geoLocation.lat, geoLocation.lon);
        }
    }, [unity, selectedCity, geoLocation]);

    useEffect(()=>{
        getGeolocation()
    },[])

    const handleInputChange = (e) => {
        const { value } = e.currentTarget;
        if (value.trim() !== "") {
            fetch(
                `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=${GEO_API_KEY}`
            )
                .then((res) => res.json())
                .then((data) =>
                    setCities(
                        data.results.map(({ lat, lon, city, country, formatted }) => ({
                            lat,
                            lon,
                            city,
                            country,
                            formatted,
                        }))
                    )
                );
        } else {
            setSelectedCity(null);
        }
    };

    const autocompleteSelect = (e, value) => {
        if (value) {
            setSelectedCity(value);
            setGeoLocation(undefined);
        } else {
            dispatch(resetData());
            setSelectedCity(null);
            setGeoLocation(undefined);
        }
    };
    return (
        <>
            <Form>
                <Form.Group className={styles.searchContainer}>
                        <Autocomplete className={styles.searchInput}
                                      clearOnBlur={false}
                                      onChange={autocompleteSelect}
                                      getOptionLabel={option => option.formatted}
                                      renderInput={ (params) => <TextField onChange={handleInputChange} {...params} label={'Enter your city...'} />}
                                      options={cities || []}/>
                    <Button    variant="contained"
                               onClick={getGeolocation}
                               disabled={!geoAllowed || geoLocation !== undefined}
                               aria-label="Use my location">
                        <PositionSvg height={'35px'} width={'35px'} color={'#fff'}/>
                    </Button>

                </Form.Group>
            </Form>


        </>
    );
}

export default SearchBar;