import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { UpdateProvider } from './utils/UpdateContext';
class App extends React.Component {
  render() {
    return (
      <UpdateProvider>
        <BrowserRouter>
          <Navbar />
          <Footer />
        </BrowserRouter>
      </UpdateProvider>);
  }
}

export default App;
