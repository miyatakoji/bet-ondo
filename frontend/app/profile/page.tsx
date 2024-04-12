"use client"
import { useEffect, useState } from 'react';
import Head from 'next/head';

import Link from 'next/link';

interface TemperaturesProps {
  weatherData: Record<string, number>;
}

interface UserProfile {
  username: string;
  email: string;
  joinedDate: string;
}

export default function Home() {
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: "JohnDoe",
    email: "john@example.com",
    joinedDate: "January 1, 2022"
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
        <p><strong>Email:</strong> {userProfile.email}</p>
        <p><strong>Joined:</strong> {userProfile.joinedDate}</p>
      </div>
    </div>
  );
}

