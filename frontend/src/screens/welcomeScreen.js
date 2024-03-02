import React from 'react'
import { useNavigate } from 'react-router'

export default function WelcomeScreen() {
  const baseUrl = process.env.REACT_APP_ASSETS_URL
  const navigate = useNavigate()
  const submitHandler = () => {
    navigate('/')
  }
  return (
    <div className="welcome-main-div">
      <div className="welcome-div">
        <div className="welcome-success">
          <div className="success-img-div">
            <img
              src={baseUrl + `assets/success.jpg`}
              alt="success"
              className="success-img"
            />
          </div>
          <h3>आपका पंजीयन हो गया है</h3>
          <button onClick={submitHandler} className="welcome-button">
            OK
          </button>
        </div>
      </div>
    </div>
  )
}
