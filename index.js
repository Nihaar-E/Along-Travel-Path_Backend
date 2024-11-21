// const express = require('express');
// const axios = require('axios');
// co.30 -4.30
// const app = express();

// app.use(cors()); // Enable all CORS requests

// app.get('/', (req, res) => {
//   res.send('Welcome to the Directions API!');
// });

// app.get('/directions', async (req, res) => {
//   try {
//     const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
//       params: {
//         origin: req.query.origin,
//         destination: req.query.destination,
//         key: 'AIzaSyBB6QR9xfg19VREe2nswPgWiEQRy4h-wh0'
//       }
//     });
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).send(error.toString());
//   }
// });

// app.listen(5000, () => {
//   console.log('Server running on port 5000');
// });

import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the Directions API!");
});

app.get("/directions", async (req, res) => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/directions/json",
      {
        params: {
          origin: req.query.origin,
          destination: req.query.destination,
          key: process.env.GOOGLE_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Route for fetching weather data from OpenWeatherMap API
app.get("/weather", async (req, res) => {
  const { lat, lon } = req.query; // Extract latitude and longitude from the request query

  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing latitude or longitude" });
  }

  try {
    // Fetch weather data from OpenWeatherMap API
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          lat: lat,
          lon: lon,
          appid: process.env.WEATHER_API_KEY,
          // Use the API key from environment variables
          units: "metric", // You can change it to 'imperial' if you want Fahrenheit
        },
      }
    );

    // Send back the weather data
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
