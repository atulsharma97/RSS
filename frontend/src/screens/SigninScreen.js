import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export default function SigninScreen() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    phone_no: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("user", user);

    // navigate("/");
  };

  return (
    <div>
      {/* <>
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
      </> */}
      <div className="signup-main">
        <section
          className="signup"
          style={{ backgroundImage: `url("/assets/p4.jpg")` }}
        >
          <div className="overlay"></div>
          <img src="images/signup-bg.jpg" alt="" />
          <div className="container2">
            <div className="signup-content">
              <form
                method="POST"
                id="signup-form"
                className="signup-form"
                onSubmit={submitHandler}
              >
                <h2 className="form-title">लॉगिन करें</h2>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-input"
                    name="phone_no"
                    id="number"
                    placeholder="फ़ोन नम्बर डालें"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-input"
                    name="password"
                    id="password"
                    placeholder="पासवर्ड"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="submit"
                    name="submit"
                    id="submit"
                    className="form-submit form-submit2"
                    value="लॉगिन "
                  />
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
