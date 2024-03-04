import React, { useContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import RegisterScreen from './components/Registration.js'
import SigninScreen from './components/Signin.js'
import WelcomeScreen from './screens/welcomeScreen.js'
import Authentication from './screens/Authentication.js'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { ToastContainer } from 'react-toastify'
import { Store } from './Store.js'
import ProtectedRoute from './components/ProtectedRoutes.js'
import Sidebar from './components/Sidebar.js'
import AllUsers from './screens/MahaNagarAdmin/Dashboard/AllUsers.js'
import UserCreate from './screens/MahaNagarAdmin/Dashboard/UserCreate.js'
import MakeUserAdmin from './screens/MahaNagarAdmin/Dashboard/MakeUserAdmin.js'

function App() {
  const baseUrl = process.env.REACT_APP_ASSETS_URL
  console.log('process', process.env)
  console.log('baseUrl', baseUrl)

  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { userInfo } = state
  const [isSideBarOpen, setIsSideBarOpen] = useState(true)

  const handleToggle = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }
  return (
    <BrowserRouter
    //  basename="/rss/"
    >
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
                src={baseUrl + `assets/Rss flag.png`}
                alt="Rss Flag"
                className="navicon"
              />
              <span>
                <h5>रास्ट्रीय स्वयंसेवक संघ - उज्जैन महानगर</h5>
              </span>
            </Navbar.Brand>
          </Container>
        </Navbar>
      </>

      <div className="main">
        {userInfo && isSideBarOpen && (
          <div className="sidebar-app">
            <Sidebar />
          </div>
        )}

        <div
          className={userInfo && isSideBarOpen ? 'Routes-app' : 'Routes-app-1'}
        >
          <Routes>
            <Route
              path="/"
              element={userInfo ? <AllUsers /> : <Authentication />}
            ></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AllUsers />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/dashboard/create-users"
              element={
                <ProtectedRoute>
                  <UserCreate />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/dashboard/make-useradmin/:id"
              element={
                <ProtectedRoute>
                  <MakeUserAdmin />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/welcomepage" element={<WelcomeScreen />}></Route>
            <Route
              path="/signin"
              element={<SigninScreen></SigninScreen>}
            ></Route>
            {/* <Route path="/home" element={<Home></Home>}></Route> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
