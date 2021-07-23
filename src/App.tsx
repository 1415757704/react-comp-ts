import React from 'react';
import logo from './logo.svg';
import Hello from './Hello';
import './styles/index.scss';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Hello message="e1231" />
      </header>
    </div>
  );
}

export default App;
