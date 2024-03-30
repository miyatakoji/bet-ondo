import Image from "next/image";
import Head from 'next/head';

export default function Home() {
  return (
    <div className="container">
      <header className="header">
        <h1>Welcome to BetOnDo</h1>
        <p>Guess the future temperature and contribute to climate awareness.</p>
      </header>
      <main className="main">
        <section className="predictionSection">
          <h2>Make Your Prediction</h2>
          <input type="number" placeholder="Enter temperature" />
          <button>Submit Prediction</button>
        </section>
        <section className="stakingSection">
          <h2>Stake Your Tokens</h2>
          <button>Stake Now</button>
        </section>
        <section className="educationSection">
          <h2>Learn About Climate Change</h2>
          <p>Understand the impact of your actions and how you can make a difference.</p>
        </section>
      </main>
      <footer className="footer">
        <p>Powered by BetOnDo</p>
      </footer>
    </div>
  );
}