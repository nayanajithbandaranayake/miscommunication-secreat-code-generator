import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";

import Navbar from "./components/Navbar";
import SafeRoute from "./components/SafeRoute";
import SafeRouteLogged from "./components/SafeRouteLogged";
import SafeRouteProfile from "./components/SafeRouteProfile";
import CreatePatternPage from "./pages/CreatePatternPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

import HomePage from "./pages/HomePage";
import Library from "./pages/Library";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <SafeRoute path="/signup">
          <SignupPage />
        </SafeRoute>
        <SafeRoute path="/login">
          <LoginPage />
        </SafeRoute>
        <SafeRoute path="/reset/password">
          <ForgotPasswordPage />
        </SafeRoute>
        <SafeRouteProfile path="/profile/:username" />
        <Route path="/library">
          <Library />
        </Route>
        <SafeRouteLogged path="/patterns/create">
          <CreatePatternPage />
        </SafeRouteLogged>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
