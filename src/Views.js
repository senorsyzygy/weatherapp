import React, { useState } from "react"
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

function Views({weather}){

    const day = new Date(weather.dt * 1000).toLocaleString();
    const sunRise = new Date(weather.sunrise * 1000).getHours()
    const sunSet = new Date(weather.sunset * 1000).getHours()
    const description = weather.weather[0]
    const image = `http://openweathermap.org/img/wn/${description.icon}@2x.png`
    const maxTemp = Math.round(weather.temp.max, 1)
    const minTemp = Math.round(weather.temp.min, 1)
    const windSpeed = Math.round(weather.wind_speed, 1)
    const dataKey = weather.dateString + "data"

    console.log(weather)
return(
<>
<Card className="mx-auto text-center mt-2">
    <Card.Header as="h5">{day}</Card.Header>
    <Image className="mx-auto" src={image} alt="" />
    <Card.Body>
        <Card.Text>Min Temp: {minTemp}°c</Card.Text>
        <Card.Text>Max Temp: {maxTemp}°c</Card.Text>
        <Card.Text>Wind Speed: {windSpeed}</Card.Text>
        <Card.Text>Sunrise: {sunRise}:00</Card.Text>
        <Card.Text>Sunset: {sunSet}:00</Card.Text>
    </Card.Body>
</Card>
</>
)
}


export default Views