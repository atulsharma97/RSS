import React, { useContext, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import "./media.css";
// import RegisterScreen from "./components/Registration.js";
import SigninScreen from "./components/Signin.js";
import WelcomeScreen from "./screens/welcomeScreen.js";
import Authentication from "./screens/Authentication.js";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { ToastContainer } from "react-toastify";
import { Store } from "./Store.js";
import ProtectedRoute from "./components/ProtectedRoutes.js";
import Sidebar from "./components/Sidebar.js";
import AllUsers from "./screens/MahaNagarAdmin/Dashboard/AllUsers.js";
import UserCreate from "./screens/MahaNagarAdmin/Dashboard/UserCreate.js";
import MakeUserAdmin from "./screens/MahaNagarAdmin/Dashboard/MakeUserAdmin.js";
import NagarScreen from "./screens/MahaNagarAdmin/Nagars/NagarScreen.js";
import CreateNagar from "./screens/MahaNagarAdmin/Nagars/CreateNagar.js";
import BastiScreen from "./screens/MahaNagarAdmin/Bastis/BastiScreen.js";
import CreateBasti from "./screens/MahaNagarAdmin/Bastis/CreateBasti.js";
import ShakaScreen from "./screens/MahaNagarAdmin/Shakas/ShakaScreen.js";
import CreateShaka from "./screens/MahaNagarAdmin/Shakas/CreateShaka.js";
import VibhagScreen from "./screens/MahaNagarAdmin/Vibhag/VibhagScreen.js";
import CreateVibhag from "./screens/MahaNagarAdmin/Vibhag/CreateVibhag.js";
import ShikshanScreen from "./screens/MahaNagarAdmin/Shikshan/ShikshanScreen.js";
import CreateShikshan from "./screens/MahaNagarAdmin/Shikshan/CreateShikshan.js";
import NagarUser from "./screens/NagarAdmin/Dashboard/NagarUser.js";
import BastiUser from "./screens/BastiAdmin/Dashboard/BastiUser.js";
import MahanagarAdminRoute from "./components/MahanagarAdminRoute.js";
import NagarAdminRoute from "./components/NagarAdminRoute.js";
import DaitvaScreen from "./screens/MahaNagarAdmin/Daitva/DaitvaScreen.js";
import CreateDaitva from "./screens/MahaNagarAdmin/Daitva/CreateDaitva.js";
import NagarDetails from "./screens/NagarAdmin/Dashboard/NagarDetails.js";
import BastiDetails from "./screens/BastiAdmin/Dashboard/BastiDetails.js";
import AdminsDetail from "./screens/MahaNagarAdmin/Admins/AdminsDetail.js";
import AdminUpdate from "./screens/MahaNagarAdmin/Admins/AdminUpdate.js";
import NagarAdminsDetail from "./screens/NagarAdmin/Admins/NagarAdminsDetail.js";

function App() {
  const baseUrl = process.env.REACT_APP_ASSETS_URL;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  // console.log("dataofusser", userInfo.data.role);

  const handleToggle = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
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
              RSS{" "}
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
        {userInfo && (
          <div className={isSideBarOpen ? `sidebar-app` : `sidebar-app-close`}>
            <Sidebar />
          </div>
        )}

        <div
          className={userInfo && isSideBarOpen ? "Routes-app" : "Routes-app-1"}
        >
          <Routes>
            <>
              <Route
                path="/"
                element={
                  userInfo?.data?.role === "mahaNagarAdmin" ? (
                    <AllUsers />
                  ) : userInfo?.data?.role === "nagarAdmin" ? (
                    <NagarUser />
                  ) : userInfo?.data?.role === "bastiAdmin" ? (
                    <BastiUser />
                  ) : (
                    <Authentication />
                  )
                }
              ></Route>
              {/* <Route path="/register" element={<RegisterScreen />}></Route> */}
              <Route path="/adminsdetail" element={<AdminsDetail />}></Route>
              <Route path="/update-admin" element={<AdminUpdate />}></Route>
              {userInfo?.data?.role === "mahaNagarAdmin" && (
                <>
                  {/* <Route
                    path="/dashboard"
                    element={
                      <MahanagarAdminRoute>
                        <AllUsers />
                      </MahanagarAdminRoute>
                    }
                  ></Route> */}
                  <Route
                    path="/dashboard/create-users"
                    element={
                      <MahanagarAdminRoute>
                        <UserCreate />
                      </MahanagarAdminRoute>
                    }
                  ></Route>
                  <Route
                    path="/dashboard/make-useradmin/:id"
                    element={
                      <MahanagarAdminRoute>
                        <MakeUserAdmin />
                      </MahanagarAdminRoute>
                    }
                  ></Route>
                  <Route
                    path="/nagar"
                    element={
                      <MahanagarAdminRoute>
                        <NagarScreen />
                      </MahanagarAdminRoute>
                    }
                  ></Route>
                  <Route
                    path="/create-nagars"
                    element={
                      <MahanagarAdminRoute>
                        <CreateNagar />
                      </MahanagarAdminRoute>
                    }
                  ></Route>
                  <Route
                    path="/basti"
                    element={
                      <MahanagarAdminRoute>
                        <BastiScreen />
                      </MahanagarAdminRoute>
                    }
                  ></Route>
                  <Route
                    path="/create-bastis"
                    element={
                      <MahanagarAdminRoute>
                        <CreateBasti />
                      </MahanagarAdminRoute>
                    }
                  ></Route>
                  <Route
                    path="/create-shakas"
                    element={
                      <MahanagarAdminRoute>
                        <CreateShaka />
                      </MahanagarAdminRoute>
                    }
                  ></Route>
                  <Route
                    path="/shaka"
                    element={
                      <MahanagarAdminRoute>
                        <ShakaScreen />
                      </MahanagarAdminRoute>
                    }
                  ></Route>

                  <Route
                    path="/create-daitva"
                    element={
                      <MahanagarAdminRoute>
                        <CreateDaitva />
                      </MahanagarAdminRoute>
                    }
                  ></Route>

                  <Route
                    path="/create-vibhag"
                    element={
                      <MahanagarAdminRoute>
                        <CreateVibhag />
                      </MahanagarAdminRoute>
                    }
                  ></Route>

                  <Route
                    path="/create-shikshan"
                    element={
                      <MahanagarAdminRoute>
                        <CreateShikshan />
                      </MahanagarAdminRoute>
                    }
                  ></Route>
                </>
              )}
              <Route
                path="/daitva"
                element={
                  <ProtectedRoute>
                    <DaitvaScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/vibhag"
                element={
                  <ProtectedRoute>
                    <VibhagScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/shikshan"
                element={
                  <ProtectedRoute>
                    <ShikshanScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="/welcomepage" element={<WelcomeScreen />}></Route>
              <Route
                path="/signin"
                element={<SigninScreen></SigninScreen>}
              ></Route>

              {userInfo?.data?.role === "nagarAdmin" && (
                <>
                  {/* <Route
                    path="/nagar-user"
                    element={
                      <NagarAdminRoute>
                        <NagarUser />
                      </NagarAdminRoute>
                    }
                  ></Route> */}
                  <Route
                    path="/nagar-details"
                    element={
                      <NagarAdminRoute>
                        <NagarDetails />
                      </NagarAdminRoute>
                    }
                  ></Route>
                  <Route
                    path="/nagar-admins-detail"
                    element={
                      <NagarAdminRoute>
                        <NagarAdminsDetail />
                      </NagarAdminRoute>
                    }
                  ></Route>
                </>
              )}
              {userInfo?.data?.role === "bastiAdmin" && (
                <>
                  {/* <Route
                    path="/basti-user"
                    element={
                      <ProtectedRoute>
                        <BastiUser />
                      </ProtectedRoute>
                    }
                  ></Route> */}
                  <Route
                    path="/basti-details"
                    element={
                      <ProtectedRoute>
                        <BastiDetails />
                      </ProtectedRoute>
                    }
                  ></Route>
                </>
              )}
            </>
            {/* <Route path="/home" element={<Home></Home>}></Route> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
