import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import LandingPage from './pages/landing-page/LandingPage';
import SignUp from './pages/sign-up/SignUp';
import { UpdateProvider } from './utils/UpdateContext';
class App extends React.Component {
  render() {
    return (
      <UpdateProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="*" element={<LandingPage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UpdateProvider>);
  }
}

export default App;
