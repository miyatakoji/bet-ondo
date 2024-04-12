// @use client
import { useEffect, useState } from 'react';
import Head from 'next/head';

import Link from 'next/link';

interface TemperaturesProps {
  weatherData: Record<string, number>;
}

export default function Home() {
  interface TemperatureData {
    city: string;
    temperature: number;
  }
  
  const temperatureData: TemperatureData[] = [
    { city: "Tokyo", temperature: 16.2 },
    { city: "London", temperature: 10.6 },
    { city: "New York", temperature: 9.1 },
    { city: "Rome", temperature: 15.5 },
    { city: "Cairo", temperature: 22.1 },
    { city: "Sydney", temperature: 18.6 }
  ];

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
      

      <main className="main">
        <section className="predictionSection">
          <h2>Welcome to BetOnDo!</h2>
          <p>Experience the thrill of predicting temperatures from cities around the globe and learn about climate change while you play. Here’s what you can do on our platform:</p>

          <div className="descSection">
            <div className="descSectionboxs">
              <div className="descSectionbox">
                <div className="descSectionboxitem">
                <h3>Predict Temperatures</h3>
                <p>・Guess the future temperature of major cities one month in advance.</p>
                <p>・Make predictions to earn rewards based on your accuracy.</p>
                </div>
                <div className="descSectionboxitem">
                <h3>Participate in Global Challenges</h3>
                <p>・Compete with players from all over the world.</p>
                <p>・See how your predictions stack up against others.</p>
                </div>
                <div className="descSectionboxitem">
                <h3>Learn and Educate</h3>
                <p>・Engage with educational content about climate change.</p>
                <p>・Understand the impact of global warming through interactive activities.</p>
                </div>
                

              </div>
              <div className="descSectionbox">
                <div className="descSectionboxitem">
                <h3>Earn Rewards</h3>
                <p>・Win prizes by making the closest temperature predictions.</p>
                <p>・Stake your tokens to earn a return from the game's fees.</p>
                </div>
                <div className="descSectionboxitem">
                <h3>Track Your Progress</h3>
                <p>・View your prediction history and improve your forecasting skills.</p>
                <p>・Monitor your earnings and see detailed statistics on your performance.</p>
                </div>
                

              </div>
            </div>
            
          </div>
          

          <h2>Make Your Prediction</h2>
          <p>Choose a City to Predict.Get started now and make a difference by having fun and learning about our planet’s climate. Your predictions help raise awareness and drive actions towards a sustainable future.</p>          

        
          <div className="cityLinks">
            <Link href="/prediction" className="cityLink">
                <span>Tokyo</span>
                <img src="/tokyo.png" alt="Results" className="city} "/>
            </Link>
            <Link href="/prediction" className="cityLink">
                <span>London</span>
                <img src="/london.png" alt="My Profile" className="city} "/>
            </Link>          
            <Link href="/prediction" className="cityLink">
              <span>Kairo</span>
              <img src="/kairo.png" alt="My Profile" className="city} "/>
            </Link>
            <Link href="/prediction" className="cityLink">
              <span>Sidney</span>
              <img src="/sidney.png" alt="My Profile" className="city} "/>
            </Link>
            <Link href="/prediction" className="cityLink">
              <span>NewYork</span>
              <img src="/ny.png" alt="My Profile" className="city} "/>
            </Link>
            <Link href="/prediction" className="cityLink">
              <span>Rome</span>
              <img src="/rome.png" alt="My Profile" className="city} "/>
            </Link>
          </div>
          <div className="stakingsection">
            <h2>Staking on BetOnDo</h2>
            <p>Unlock the full potential of your predictions by participating in our staking program. Staking not only enhances your engagement with the platform but also offers you the opportunity to earn passive income. Here’s what you need to know about staking on BetOnDo:</p>
            <div className="stakingsectionbutton">
            <Link className="navlink"  href="/staking">Staking Now!!!!!! click here</Link>
            </div>
          </div>
          <div className="temp-table-wrapper">
            <h2>Current Temperatures</h2>
            <table className="temp-table-table">
              <thead>
                <tr>
                  <th>City</th>
                  <th>Temperature (°C)</th>
                </tr>
              </thead>
              <tbody>
                {temperatureData.map((data) => (
                  <tr key={data.city}>
                    <td>{data.city}</td>
                    <td>{data.temperature}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="footer">
        Powered by BetOnDo
      </footer>
    </div>
  );
}

