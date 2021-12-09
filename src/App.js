import React, { useState, useEffect } from "react";
import { ApiClient} from './ApiClient';
import Views from './Views'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
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
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          />
        </form>
        </div>
        <Row className="header-row text-center">
          <h1 className="header-title">Welcome to the weather app</h1>
          <h3 className="header-text">You can search through a select few cities at the top, just press enter when you're ready to search!</h3>
        </Row>
        <Row className="card-group justify-content-center">
          {weatherData.map(weather => 
            <Col xs={2} key={weather.dt}>
              <Views key={weather.dt} weather={weather} />
            </Col>
          )
          }
        </Row>
        <Row className="footer-row text-center">
          <h2 className="location-text">You have searched for...</h2>
          <h1 className="location-search">{query}</h1>
        </Row>
        </main>
      </div>
  );
}

export default App;
