import "./App.css";
import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import 'antd/dist/antd.css';
// import 'antd/dist/antd.less';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Pages/Auth";
import Events from "./Pages/Events";
import Bookings from "./Pages/Bookings";
import MainNavigation from "./components/Navigation/MainNavigation";
import AuthContext from "./context/auth-context";

class App extends Component {
  state = {
    token: null,
    userId: null,
  };
  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };
  logout = () => {
    this.setState({ token: null, userId: null });
  };
  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout,
          }}
        >
          <MainNavigation />
          <Routes>
            <Route path="/" element={this.state.token ? null : <Auth />} />
            {!this.state.token && <Route path="auth" element={<Auth />} />}
            <Route path="events" element={<Events />} />
            {this.state.token && (
              <Route path="bookings" element={<Bookings />} />
            )}
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
