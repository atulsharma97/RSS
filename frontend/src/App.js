import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import RegisterScreen from "./screens/RegisterScreen.js";
import SigninScreen from "./screens/SigninScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import Home from "./components/Home.js";
import Authentication from "./screens/Authentication.js";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand className="logo" href="#home">
              RSS{" "}
              <img
                src="/assets/Rss flag.png"
                alt="Rss Flag"
                className="navicon"
              />
              <span>
                <h5>रास्ट्रीय स्वयंसेवक संघ</h5>
              </span>
            </Navbar.Brand>
          </Container>
        </Navbar>
      </>

      <Routes>
        <Route path="/" element={<Authentication />}></Route>
        <Route path="/register" element={<RegisterScreen />}></Route>
        <Route path="/dashboard" element={<HomeScreen />}></Route>
        <Route path="/signin" element={<SigninScreen></SigninScreen>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
