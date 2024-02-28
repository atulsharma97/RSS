import React, { useState } from "react";
import RegisterScreen from "./RegisterScreen";
import SigninScreen from "./SigninScreen";
import { motion } from "framer-motion";

const Authentication = () => {
  const signup = "register";
  const [register, setRegister] = useState(signup ? "register" : "login");
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <>
      {" "}
      <div className="register-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            {/* <div className="col-lg-6">
              <div className="register-img">
                <img src="/images/register-img.png" alt="Image" />
              </div>
            </div> */}
            <div className="">
              <div className="register-form">
                {register == "register" ? (
                  <motion.h2
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, x: 0 }}
                    exit={{ scale: 0 }}
                  ></motion.h2>
                ) : (
                  <motion.h2
                    initial={{ scale: 0 }}
                    animate={{ scale: 0.9, x: 0 }}
                    exit={{ scale: 1 }}
                  ></motion.h2>
                )}

                <ul
                  className="register-tab nav nav-tabs justify-content-between"
                  data-ison={isOn}
                  onClick={toggleSwitch}
                >
                  <li className="nav-item" role="presentation">
                    <motion.button
                      className={`nav-link ${
                        register == "register" ? "active" : ""
                      }`}
                      onClick={() => setRegister("register")}
                      whileHover={{
                        scale: 1.3,
                        transition: { duration: 1 },
                      }}
                      whileTap={{ scale: 0.8 }}
                      layout
                      transition={{
                        type: "spring",
                      }}
                    >
                      पंजीयन
                    </motion.button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <motion.button
                      className={`nav-link ${
                        register == "login" ? "active" : ""
                      }`}
                      type="button"
                      onClick={() => setRegister("login")}
                      whileHover={{
                        scale: 1.3,
                        transition: { duration: 1 },
                      }}
                      whileTap={{ scale: 0.8 }}
                      transition={{
                        type: "spring",
                      }}
                    >
                      लॉगिन
                    </motion.button>
                  </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                  {register == "register" ? (
                    <RegisterScreen />
                  ) : (
                    <SigninScreen />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
