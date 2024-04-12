import Image from "next/image";
import Head from 'next/head';
import 'leaflet/dist/leaflet.css';

import Link from 'next/link';

export default function Home() {
  const cities = [
    { name: "Tokyo", lat: 35.6895, lng: 139.6917 },
    { name: "New York", lat: 40.7128, lng: -74.0060 },
    { name: "London", lat: 51.5074, lng: -0.1278 }
  ];

  return (
    <div className="container">
      <Head>
        <title>BetOnDo Home</title>
      </Head>

      <header className="header">
        <div className="logo">
          <h1>BetOnDo</h1>
        </div>
        <nav>
          <Link className="navlink" href="/results">History</Link>
          <Link className="navlink"  href="/staking">Staking</Link>
          <Link className="navlink"  href="/profile">My Profile</Link>
        </nav>
      </header>
      

      <main className="main">
        <section className="predictionSection">
          <h2>Welcome</h2>
          <p>Guess the future temperature and contribute to climate awareness.</p>
          
          <h2>Make Your Prediction</h2>
          <div className="cityLinks">
          <Link href="/results" className="cityLink">
              <img src="/tokyo.png" alt="Results" className="city} "/>
              <span>Tokyo</span>
          </Link>
          <Link href="/profile" className="cityLink">
              <img src="/london.png" alt="My Profile" className="city} "/>
              <span>London</span>
          </Link>          
          <Link href="/profile" className="cityLink">
            <img src="/kairo.png" alt="My Profile" className="city} "/>
            <span>Kairo</span>
          </Link>
          <Link href="/profile" className="cityLink">
            <img src="/sidney.png" alt="My Profile" className="city} "/>
            <span>Sidney</span>
          </Link>
          <Link href="/profile" className="cityLink">
            <img src="/ny.png" alt="My Profile" className="city} "/>
            <span>NewYork</span>
          </Link>
          <Link href="/profile" className="cityLink">
            <img src="/rome.png" alt="My Profile" className="city} "/>
            <span>Rome</span>
          </Link>
        </div>

        </section>
      </main>

      <footer className="footer">
        Powered by BetOnDo
      </footer>
    </div>
  );
}

