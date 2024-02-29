import React, { useContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import RegisterScreen from './screens/RegisterScreen.js'
import SigninScreen from './screens/SigninScreen.js'
import HomeScreen from './screens/HomeScreen.js'
import WelcomeScreen from './screens/welcomeScreen.js'
import Home from './components/Home.js'
import Authentication from './screens/Authentication.js'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { ToastContainer } from 'react-toastify'
import { Store } from './Store.js'
import ProtectedRoute from './components/ProtectedRoutes.js'

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { userInfo } = state
  const [isSideBarOpen, setIsSideBarOpen] = useState(true)

  const handleToggle = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }
  return (
    <BrowserRouter>
      <>
        <ToastContainer position="top-center" autoClose={600} limit={1} />

        <Navbar bg="dark" data-bs-theme="dark">
          {userInfo ? (
            <button onClick={handleToggle} className="side-btn">
              <i className="fa-solid fa-bars"></i>
            </button>
          ) : null}

          <Container>
            <Navbar.Brand className="logo" href="#home">
              RSS{' '}
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
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <HomeScreen isSideBarOpen={isSideBarOpen} />{' '}
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/welcomepage" element={<WelcomeScreen />}></Route>
        <Route path="/signin" element={<SigninScreen></SigninScreen>}></Route>
        {/* <Route path="/home" element={<Home></Home>}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
