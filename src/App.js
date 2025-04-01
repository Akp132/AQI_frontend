// === client/src/App.js ===
import React, { useState } from 'react';
import axios from 'axios';
import './AQI.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'aqi-backend-nu.vercel.app';

function App() {
  const [city, setCity] = useState('');
  const [aqiData, setAqiData] = useState(null);
  const [error, setError] = useState('');

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const fetchAqi = async () => {
    try {
      setError('');
      setAqiData(null);
      const response = await axios.get(`${API_BASE_URL}/api/aqi?city=${city}`);
      setAqiData(response.data);
    } catch (err) {
      console.error(err);
      setError('Could not fetch AQI data. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>AQI Checker 🌫️</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Enter city (e.g. delhi)"
          value={city}
          onChange={handleCityChange}
        />
        <button onClick={fetchAqi}>Check AQI</button>
      </div>

      {error && <p className="error">{error}</p>}

      {aqiData && (
        <div className="aqi-info">
          <h2>{aqiData.city?.name}</h2>
          <p><strong>AQI:</strong> {aqiData.aqi}</p>
          <p><strong>Dominant Pollutant:</strong> {aqiData.dominentpol}</p>
          <div className="pollutants">
            <p><strong>PM2.5:</strong> {aqiData.iaqi?.pm25?.v ?? 'N/A'}</p>
            <p><strong>PM10:</strong> {aqiData.iaqi?.pm10?.v ?? 'N/A'}</p>
            <p><strong>CO:</strong> {aqiData.iaqi?.co?.v ?? 'N/A'}</p>
            <p><strong>NO2:</strong> {aqiData.iaqi?.no2?.v ?? 'N/A'}</p>
            <p><strong>O3:</strong> {aqiData.iaqi?.o3?.v ?? 'N/A'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
