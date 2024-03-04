import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const MakeUserAdmin = () => {
  const apibaseUrl = process.env.REACT_APP_API_URL

  const navigate = useNavigate()

  const { id } = useParams()

  const [user, setUser] = useState({
    name: '',
    password: '',
    confirmpassword: '',
    shaka_nagar: '',
    basti: '',
    role: '',
  })
  const [filteredDaitva, setFilteredDaitva] = useState([])
  const [shakhanagar, setShakhanagar] = useState([])
  const [basti, setBasti] = useState([])
  const [selectedShakaNagar, setSelectedShakaNagar] = useState('')
  const [selectedBasti, setSelectedBasti] = useState('')
  const [isSubmiting, setIsSubmiting] = useState(false)
  console.log('id', id)
  console.log('user', user)

  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (name === 'shaka_nagar') {
      setUser((prevState) => ({ ...prevState, basti: '' }))
      setUser((prevState) => ({ ...prevState, shaka: '' }))
      setBasti([])
      setSelectedShakaNagar(value)
    }
    if (name === 'basti') {
      setUser((prevState) => ({ ...prevState, shaka: '' }))
      const valuebasti = value !== 'null' ? value : null
      setSelectedBasti(valuebasti)
    }

    setUser((prevState) => ({ ...prevState, [name]: value }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (user.password !== user.confirmpassword) {
      toast.error('password do not match')
      setIsSubmiting(false)
      return
    }
    let admin_of
    if (user.basti !== '') {
      admin_of = user.basti
    } else if (user.shaka_nagar !== '') {
      admin_of = user.shaka_nagar
    } else {
      admin_of = 0
    }

    try {
      const { data } = await axios.post(`${apibaseUrl}users/role/${id}`, {
        password: user.password,
        role: user.role,
        admin_of: admin_of,
      })
      toast.success(data.data)
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message)
    } finally {
      setIsSubmiting(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shakhanagarResponse = await axios.get(
          `${apibaseUrl}get/shaka-nagar`
        )
        if (shakhanagarResponse.data.status === 200) {
          setShakhanagar(shakhanagarResponse.data.data)
        }
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error)
      }
    }

    fetchData() // Call the fetchData function
  }, [])

  useEffect(() => {
    const fetchBastiData = async () => {
      const { data } = await axios.get(
        `${apibaseUrl}get/basti/by-shaka-nagar/${selectedShakaNagar}`
      )
      setBasti(data.data)
    }
    if (selectedShakaNagar && selectedShakaNagar !== null) {
      fetchBastiData(selectedShakaNagar)
    }
  }, [selectedShakaNagar])

  return (
    <>
      <ul className="nav-style1">
        <li>
          <Link to="/dashboard">
            <a>Users</a>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/create-users">
            <a>Create</a>
          </Link>
        </li>
        <li>
          <Link to={`/dashboard/make-useradmin/${id}`}>
            <a className="active">Make Admin</a>
          </Link>
        </li>
      </ul>
      <div>
        <div className="signup-main">
          <section className="signup">
            <div className="container1">
              <div className="signup-content">
                <form
                  method="POST"
                  id="signup-form"
                  className="sform"
                  onSubmit={submitHandler}
                >
                  <h2 className="form-title"> Make Admin </h2>

                  <div className="input-field">
                    <div className="main-img">
                      <div className="professional-info">
                        <div className=" heading"></div>
                        <div className=" left तुम">
                          <select
                            name="role"
                            id="role"
                            className="dropdown form-g form-input"
                            required
                            onChange={handleChange}
                            value={user.role}
                          >
                            <option value="" disabled hidden>
                              दायित्व क्षेत्र चुनें
                            </option>
                            <option value="mahaNagarAdmin">महानगर</option>
                            <option value="nagarAdmin">नगर</option>
                            <option value="bastiAdmin">बस्ती</option>
                          </select>

                          {user.role == 'nagarAdmin' ||
                          user.role == 'bastiAdmin' ? (
                            <select
                              name="shaka_nagar"
                              id="shaka_nagar"
                              className="dropdown form-g form-input"
                              // required={!user?.shaka_nagar}
                              onChange={handleChange}
                              // defaultValue=""
                              value={user.shaka_nagar}
                            >
                              <option value="" disabled hidden>
                                शाखा नगर चुनें
                              </option>
                              {shakhanagar.map((shakanagar, index) => (
                                <option key={index.id} value={shakanagar.id}>
                                  {shakanagar.name}
                                </option>
                              ))}
                            </select>
                          ) : null}

                          {user.role == 'bastiAdmin' ? (
                            <select
                              name="basti"
                              id="basti"
                              className="dropdown form-g form-input"
                              required
                              value={user.basti}
                              onChange={handleChange}
                            >
                              <option value="" disabled hidden>
                                बस्ती चुनें
                              </option>
                              {basti.length > 0 ? (
                                basti.map((basti, index) => (
                                  <option key={index.id} value={basti.id}>
                                    {basti.name}
                                  </option>
                                ))
                              ) : (
                                <option value="">कोई बस्ती नही</option>
                              )}
                            </select>
                          ) : null}

                          <div className="form-g">
                            <input
                              type="password"
                              className="form-input"
                              name="password"
                              id="password"
                              placeholder="password"
                              required
                              value={user.password}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-g phone-code">
                            <input
                              type="password"
                              className="form-input"
                              name="confirmpassword"
                              id="password"
                              placeholder="Confirm Password"
                              required
                              value={user.confirmpassword}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      name="submit"
                      id="submit"
                      className={isSubmiting ? 'form-submit-1 ' : 'form-submit'}
                      disabled={isSubmiting}
                      value={isSubmiting ? 'पंजीयन हो रहा है...' : 'पंजीयन '}
                    />
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default MakeUserAdmin
