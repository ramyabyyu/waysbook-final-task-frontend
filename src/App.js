import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import * as Path from "./routeNames";
import Header from "./components/Header/Header";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={Path.HOME} element={<Home />} />
        <Route path={Path.AUTH} element={<Auth />} />
        <Route path={Path.PROFILE} element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
