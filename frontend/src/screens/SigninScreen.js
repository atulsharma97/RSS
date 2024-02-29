import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Store } from '../Store'

export default function SigninScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store)

  const navigate = useNavigate()

  const [user, setUser] = useState({
    phone_no: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setUser((prevState) => ({ ...prevState, [name]: value }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log('user', user)
    try {
      const { data } = await axios.post(
        `http://localhost/CI/public/users/login`,
        user
      )
      console.log('loginCredentials', data)
      toast.success(data.message)
      ctxDispatch({ type: 'USER_SIGNIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate('/dashboard')
    } catch (error) {
      // console.log('error', error)
      toast.error(error.response.data.data)
    }
  }

  return (
    <div>
      <div className="signup-main">
        <section className="signup">
          <div className="overlay"></div>
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
                    placeholder="फ़ोन नम्बर"
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
  )
}
