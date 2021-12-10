import React, { useState } from "react"
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

function Views({weather}){
    const [show,setShow]=useState(false)
    const day = new Date(weather.dt * 1000).toDateString();
    const sunRise = new Date(weather.sunrise * 1000).toLocaleTimeString()
    const sunSet = new Date(weather.sunset * 1000).toLocaleTimeString()
    const description = weather.weather[0]
    const image = `http://openweathermap.org/img/wn/${description.icon}@2x.png`
    const maxTemp = Math.round(weather.temp.max, 1)
    const minTemp = Math.round(weather.temp.min, 1)
    const windSpeed = Math.round(weather.wind_speed, 1)
    const dayTemp = Math.round(weather.temp.day, 1)

    // const seeMoreBtn = document.querySelector('.see-more-btn');
    // const text = document.querySelector('.texttext');

    // seeMoreBtn.addEventListener('click',(e)=>{
    //     text.classList.toggle('show-more');
    //     if(seeMoreBtn.innerText === 'See More'){
    //         seeMoreBtn.innerText = 'See Less';
        
    //     }else {
    //         seeMoreBtn.innerText = 'See More';
    //     }
    // })
    
   

return(
<>
<Card className="mx-auto text-center mt-2 card">
    <Card.Header as="h5">{day}</Card.Header>
    <Card.Text className="description">{description.description}</Card.Text>
    <Image className="mx-auto" src={image} alt="" />
    <Card.Body class="texttext">
        <Card.Text>Day Temp: {dayTemp}°c</Card.Text>
        { show?
        <><Card.Text>Min Temp: {minTemp}°c</Card.Text><Card.Text>Max Temp: {maxTemp}°c</Card.Text><Card.Text>Wind Speed: {windSpeed}kph</Card.Text><Card.Text>Sunrise: {sunRise} GMT</Card.Text><Card.Text>Sunset: {sunSet} GMT</Card.Text></> :null
        }
        <a name={weather.dt} href={"#"+weather.dt} class="see-more-btn" onClick={() => setShow(!show)}>See more/less</a>
    </Card.Body>
</Card>
</>
)
}


export default Views