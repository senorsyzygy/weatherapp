import React, { useState, useEffect } from "react";
import { ApiClient} from './ApiClient';
import Views from './Views'
import { ListGroup, Row, Col } from "react-bootstrap";
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
//  import Script from './script.js'

const cities = require('./small.json')

function App() {

  const [weatherData, setWeatherData] = useState([]);
  const [query, setQuery] = useState('')

  const apiClient = new ApiClient();

  const updateWeather = (name = 'Sheffield') => {
    const city = cities.filter(([_name]) => _name == name)
    if (!city || !city.length) {
      alert("City not found! Try again")
      return
    }

    const [,lat, lon] = city[0]
    apiClient.getWeather(lat, lon)
    .then((res) => {
      const response = res.data.daily.slice(0,5)
      setWeatherData(response)
    })
  }

  useEffect(() => {
    updateWeather()
  }, [])

  const submitHandler = (e, name) => {
    e.preventDefault()
    updateWeather(name)
  }
  console.log(query)
  return (
      <div className="app">
        <main>
        <div className="search-box">
        <form onSubmit={(e) => submitHandler(e, query)}>
          <input
          type="text"
          className="search-bar"
          placeholder="Type in your city here..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          />
        </form>
        </div>
        <Row className="header-row text-center">
          <h1 className="header-title">The Weather App</h1>
          <h3 className="header-text">The default location is Sheffield</h3>
          {/* <h5 className="header-text">You can use the search box at the top to find out the weather for other locations</h5>
          <h5 className="header-text">Just type out the city name (with a capital letter first) and press enter</h5> */}
        </Row>
        <Row className="footer-row text-center">
          <h2 className="location-text">You have searched for {query}</h2>
          <h1 className="location-search"></h1>
        </Row>
        <Row xs={1} sm={2} className="card-group justify-content-center">
          {weatherData.map(weather => 
            <Col md key={weather.dt}>
              <Views key={weather.dt} weather={weather} />
            </Col>
          )
          }
        </Row>
        </main>
      </div>
  );
}

export default App;
