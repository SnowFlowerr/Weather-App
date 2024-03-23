import React, { useEffect, useState } from 'react'
import styles from "./Weatherui.module.css"
import NavBar from './NavBar'
import axios from 'axios';

export default function Weatherui() {
    const [data, setData] = useState([1, 2, 3, 4])
    const [state, setState] = useState("Andhra Pradesh")
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const [cel, setCel] = useState(true)
    const [feh, setFeh] = useState(false)
    const [live, setLive] = useState({
        "datetime": null,
        "tempmax": null,
        "tempmin": null,
        "temp": null,
        "humidity": null,
        "precip": null,
        "preciptype": null,
        "solarradiation": null,
        "windspeedmean": null,
        "description": "Enter correct Location",
    })

    useEffect(() => {
        async function fetchData() {
            try {
                let response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${state}%20india?unitGroup=metric&elements=datetime%2CdatetimeEpoch%2Ctempmax%2Ctempmin%2Ctemp%2Chumidity%2Cprecip%2Cpreciptype%2Cwindspeedmean%2Csolarradiation%2Cdescription&include=fcst%2Cevents%2Ccurrent&key=UHFY2CQ8X3RMXJMJ488U877Z8&contentType=json`)
                setData(response.data.days);
                setLive(response.data.days[0])
                allwhite()
            } catch (error) {
                console.error(error.message);
                setLive({
                    "datetime": null,
                    "tempmax": null,
                    "tempmin": null,
                    "temp": null,
                    "humidity": null,
                    "precip": null,
                    "preciptype": null,
                    "solarradiation": null,
                    "windspeedmean": null,
                    "description": "Enter correct Location",
                })
            }
        }
        fetchData();
    }, [state])
    function handleLive(Index) {
        setLive(data[Index])
        allwhite()
        document.getElementById(`${Index}`).style.color = "black"
    }
    function handleCel(e) {
        e.preventDefault();
        setCel(true)
        setFeh(false)
        if (true) {
            document.getElementById('cel').style.color = "black"
            document.getElementById('feh').style.color = "rgb(112, 108, 108)"
        }
    }
    function handleFeh(e) {
        e.preventDefault();
        setCel(false)
        setFeh(true)
        if (true) {
            document.getElementById('feh').style.color = "black"
            document.getElementById('cel').style.color = "rgb(112, 108, 108)"
        }
    }
    function allwhite(){
        for(let i=0;i<data.length;i++){
            document.getElementById(`${i}`).style.color = "rgb(112, 108, 108"
        }
    }
    function getImage(condition) {
        if(condition==="Partly cloudy throughout the day."){
            return <i class="fa-solid fa-cloud-sun"></i>;
        }
        else if(condition==="Clear conditions throughout the day."){
            return <i class="fa-solid fa-sun"></i>;
        }
        else if(condition==="Cloudy skies throughout the day."){
            return <i class="fa-solid fa-cloud"></i>;
        }
        else if(condition==="Cloudy skies throughout the day with late afternoon rain."){
            return <i class="fa-solid fa-cloud-moon-rain"></i>;
        }
        else if(condition==="Partly cloudy throughout the day with a chance of rain throughout the day."){
            return <i class="fa-solid fa-cloud-sun-rain"></i>;
        }
        else if(condition==="Partly cloudy throughout the day with late afternoon rain."){
            return <i class="fa-solid fa-cloud-showers-heavy"></i>;
        }
        else if(condition==="Partly cloudy throughout the day with a chance of rain."){
            return <i class="fa-solid fa-cloud-sun-rain"></i>
        }
        else if(condition==="Cloudy skies throughout the day with a chance of rain throughout the day."){
            return <i class="fa-solid fa-cloud-rain"></i>
        }
        else if(condition==="Partly cloudy throughout the day with rain."){
            return <i class="fa-solid fa-cloud-sun-rain"></i>
        }
        else if(condition==="Becoming cloudy in the afternoon."){
            return <i class="fa-solid fa-cloud-moon"></i>;
        }
        else if(condition==="Partly cloudy throughout the day with early morning rain."){
            return <i class="fa-solid fa-cloud-sun-rain"></i>;
        }
        else if(condition==="Partly cloudy throughout the day with storms possible."){
            return <i class="fa-solid fa-wind"></i>
        }
        else if(condition==="Becoming cloudy in the afternoon with rain."){
            return <i class="fa-solid fa-cloud-moon-rain"></i>;
        }
        else if(condition==="Clearing in the afternoon."){
            return <i class="fa-solid fa-moon"></i>
        }
        else if(condition==="Becoming cloudy in the afternoon with storms possible."){
            return <i class="fa-solid fa-wind"></i>
        }
        else{
            return <i class="fa-solid fa-cloud"></i>
        }
    }


    return (
        <>
            <NavBar setState={setState} ></NavBar>
            <div className={styles.Bigbox}>
                <div className={styles.descri}>
                    {live.description}
                </div>
                <div className={styles.live}>
                    <div className={styles.icon}>{getImage(live.description)}</div>
                    <div className={styles.liveMinMax}><div className={styles.liveTemp}>{cel === true ? Math.round(live.temp) : Math.round((live.temp * 9 / 5) + 32)}</div><div>{cel === true ? Math.floor(live.tempmin) : Math.floor(live.tempmin * 9 / 5) + 32}<sup>o</sup> / {cel === true ? Math.floor(live.tempmax) : Math.floor(live.tempmax * 9 / 5) + 32}<sup>o</sup></div></div>
                    <div className={styles.threeicon}><div className={styles.smallIcon}><i class="fa-solid fa-wind"></i><span className={styles.Numbers}>{cel === true ? Math.floor(live.windspeedmean) : Math.round(live.windspeedmean / 1.6)}</span><span className={styles.letters}>{cel === true ? " km/h" : " mph"} </span></div><div className={styles.smallIcon}><i class="fa-solid fa-umbrella"></i><span className={styles.Numbers}>{Math.floor(live.precip)}</span><span className={styles.letters}> %</span></div><div className={styles.smallIcon}> <i class="fa-solid fa-droplet"></i><span className={styles.Numbers}>{Math.floor(live.humidity)}</span><span className={styles.letters}> %</span></div></div>
                </div>
                <div className={styles.datebox}>
                    {data.map((element, Index) => <div onClick={() => handleLive(Index)} id={`${Index}`}>
                        <div className={styles.box}>{getImage(element.description)}</div>
                        <div className={styles.tempe}>{cel === true ? Math.floor(element.tempmin) : Math.floor(element.tempmin * 9 / 5) + 32}<sup>o</sup> / {cel === true ? Math.floor(element.tempmax) : Math.floor(element.tempmax * 9 / 5) + 32}<sup>o</sup></div>
                        <div className={styles.date}>{days[new Date(element.datetime).getDay()]}</div>
                    </div>)}
                </div>
                <div className={styles.celFar}>
                    <button onClick={handleCel} className={styles.cel} id="cel"><b><sup>o</sup>C</b></button> | <button onClick={handleFeh} className={styles.feh} id='feh'><b><sup>o</sup>F</b></button>
                </div>
            </div>
        </>
    )
}
