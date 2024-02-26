import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("email", email);
    navigate("/home");
  };

  return (
    <div className="signup-main">
      <section
        className="signup"
        style={{ backgroundImage: `url("/assets/p4.jpg")` }}
      >
        <div className="overlay"></div>
        <img src="images/signup-bg.jpg" alt="" />
        <div className="container1">
          <div className="signup-content">
            <form
              method="POST"
              id="signup-form"
              className="signup-form"
              onSubmit={submitHandler}
            >
              <h2 className="form-title">Reset Password</h2>
              <div className="form-group">
                <input
                  type="email"
                  className="form-input"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  name="submit"
                  id="submit"
                  className="form-submit"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
