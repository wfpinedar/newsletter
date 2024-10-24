import logo from './logo.svg';
import React from 'react';
import NewsletterList from './components/NewsletterList';
import SubscriberList from './components/SubscriberList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestión de Newsletters</h1>
      </header>
      <main>
        <div className="content-container">
          <NewsletterList />
          <SubscriberList />
        </div>

      </main>
    </div>
  );
}

export default App;
