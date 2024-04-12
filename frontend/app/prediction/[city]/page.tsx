"use client"
// import { useNavigation } from 'next/navigation';
import React, { useState } from 'react';
import "./index.css";
import Head from 'next/head';
import Link from 'next/link';

interface CityData {
  betCount: number;
  closestAmount: number;
  temperatures: number[];
}

interface PredictionData {
  [key: string]: CityData;
}


const predictionData : PredictionData = {
  "Tokyo": {
    betCount: 34,
    closestAmount: 20.5,
    temperatures: Array.from({length: 40}, (_, i) => 15 + Math.round(Math.sin(i) * 10))
  },
  "London": {
    betCount: 29,
    closestAmount: 20.5,
    temperatures: Array.from({length: 40}, (_, i) => 10 + Math.round(Math.sin(i) * 5))
  },
  "New York": {
    betCount: 45,
    closestAmount: 20.5,
    temperatures: Array.from({length: 40}, (_, i) => 11 + Math.round(Math.cos(i) * 8))
  },
  "Rome": {
    betCount: 25,
    closestAmount: 20.5,
    temperatures: Array.from({length: 40}, (_, i) => 20 + Math.round(Math.sin(i) * 7))
  },
  "Cairo": {
    betCount: 30,
    closestAmount: 20.5,
    temperatures: Array.from({length: 40}, (_, i) => 23 + Math.round(Math.cos(i) * 6))
  },
  "Sydney": {
    betCount: 38,
    closestAmount: 20.5,
    temperatures: Array.from({length: 40}, (_, i) => 18 + Math.round(Math.sin(i) * 8))
  }
};

const Predict = () => {
  // const navigation = useNavigation();
  // const city = navigation.query.city as string;
  const city = predictionData["Tokyo"];
  

  const [temperature, setTemperature] = useState('');

  // if (!city) return <p>Loading...</p>;

  return (
    <div className="container">
      <Head>
          <title>BetOnDo Home</title>
      </Head>

      <header className="header">
        <div className="logo">
        <Link href="/"><h1>BetOnDo</h1></Link>

        </div>
        <nav>
          <Link className="navlink"  href="/profile">My Profile</Link>
        </nav>
      </header>
      <div className='wrap'>
        <h2>Tokto Temperature Prediction</h2>
        <h2>Current Status</h2>
        <div className="stats">
          <p>If your prediction is the closest to the actual temperature, this amount will be yours</p>
          <p>Current Bet Count: {city.betCount}</p>
          <p>Current Prize: ${city.betCount * 10}</p>
        </div>
        <div className="form">
          <input type="number" placeholder="Enter your prediction" />
          <button>Submit</button>
        </div>
        <div className="history">
          <h2>Past Month Temperatures</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Temperature (°C)</th>
              </tr>
            </thead>
            <tbody>
              {city.temperatures.map((item, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Predict;