import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    clouds : undefined,
    main : {feels_like : undefined,
             temp : undefined,
             humidity : undefined,
             pressure : undefined},
    name : undefined,
    sys : {country : undefined,
           sunrise : undefined},
    weather : undefined,
    wind :  {speed : undefined},
    timezone: undefined,
    dt: undefined,
    isLoaded: false,
    unity: 'metric'
}

export const WeatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setData: ((state,action)=>{
            const {clouds,main,name,sys,weather,wind, timezone, dt} = action.payload;
            state.clouds = clouds;
            state.main = main;
            state.name = name;
            state.sys = sys;
            state.weather = weather[0];
            state.wind = wind;
            state.timezone = timezone;
            state.dt = dt;
            state.isLoaded = true;
        }),
        resetData: ((state,action)=>{
            state.isLoaded = false;
        }),
        setUnity: (state, action) => {
            state.unity = action.payload;
        }

    }



})

export const {setData,resetData,setUnity} = WeatherSlice.actions;
export default WeatherSlice.reducer;