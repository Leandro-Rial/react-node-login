import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import Header from './components/header/Header';
import Pages from './components/mainPage/Pages';
import './Scss/styled.scss'

function App() {
  return (
    <DataProvider>
      <Router>
        <Header />
        <Pages />
      </Router>
    </DataProvider>
  );
}

export default App;
