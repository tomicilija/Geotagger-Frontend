import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { UpdateProvider } from './utils/UpdateContext';
class App extends React.Component {
  render() {
    return (
      <UpdateProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </UpdateProvider>);
  }
}

export default App;
