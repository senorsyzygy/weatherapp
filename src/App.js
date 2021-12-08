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
      // cry for help
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
        <Row className="card-group">
          {weatherData.map(weather => 
            <Col xs={2} key={weather.dt}>
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
