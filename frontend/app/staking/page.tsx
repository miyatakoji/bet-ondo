"use client"
import React, { useState } from 'react';
import "./index.css";
import Head from 'next/head';
import Link from 'next/link';

interface TemperaturesProps {
  weatherData: Record<string, number>;
}

export default function Home() {
  const [amount, setAmount] = useState('');
  const [staked, setStaked] = useState(false);

  const handleStake = () => {
    console.log(`Staking ${amount}`);
    setStaked(true);
  };
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
      

      <div className="container">
      <h2>Stake Your Tokens</h2>
      <div className="form">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount to stake"
        />
        <button onClick={handleStake}>Stake</button>
      </div>
      {staked && (
        <p className="confirmation">
          You have successfully staked {amount} tokens.
        </p>
      )}
      <div className="info">
        <p>Total staked: 1000 tokens</p>
        <p>Estimated returns: 5% per annum</p>
      </div>
    </div>

      <footer className="footer">
        Powered by BetOnDo
      </footer>
    </div>
  );
}

