"use client"
import { useEffect, useState } from 'react';
import Head from 'next/head';

import Link from 'next/link';

interface TemperaturesProps {
  weatherData: Record<string, number>;
}

interface UserProfile {
  username: string;
  lastBet: string;
}

export default function Home() {
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: "usename",
    lastBet: "January 1, 2022"
  });

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
      <h2>User Profile</h2>
      <div className="profileDetails">
        <p><strong>Username:</strong> {userProfile.username}</p>
        <p><strong>Joined:</strong> {userProfile.lastBet}</p>
      </div>
    </div>
  );
}

