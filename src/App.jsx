import React from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './container/Home';

function App(props) {
  return (
    <div>
      <Header/>
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;