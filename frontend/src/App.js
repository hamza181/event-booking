import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Pages/Auth";
import Events from "./Pages/Events";
import Bookings from "./Pages/Bookings";
import MainNavigation from "./components/Navigation/MainNavigation";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <MainNavigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="auth" element={<Auth />} />
              <Route path="events" element={<Events />} />
              <Route path="bookings" element={<Bookings />} />
            </Routes>
          </main>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
