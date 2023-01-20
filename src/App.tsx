import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import LandingPage from './pages/landing-page/LandingPage';
import AddLocation from './pages/location/add-location/AddLocation';
import EditLocation from './pages/location/edit-location/EditLocation';
import GuessLocation from './pages/location/guess-location/GuessLocation';
import Profile from './pages/profile/Profile';
import SignIn from './pages/sign-in/SignIn';
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
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/location/:id" element={<GuessLocation />} />
            <Route path="/location/add" element={<AddLocation />} />
            <Route path="/location/edit/:id" element={<EditLocation />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UpdateProvider>);
  }
}

export default App;
