import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import axios from 'axios'

export default function RegisterScreen() {
  const apibaseUrl = process.env.REACT_APP_API_URL
  const navigate = useNavigate()
  const baseUrl = process.env.REACT_APP_ASSETS_URL

  const [user, setUser] = useState({
    name: '',
    age: '',
    phone_no: '',
    address: '',
    city: '',
    nagar: '',
    occupation: '',
    shaka_nagar: '',
    image: '',
    basti: '',
    shaka: '',
    shikshan: '',
    vibhag: '',
    daitva: '',
    daitva_of: '',
  })
  const [imageShow, setImageShow] = useState('')
  // const [phoneNo, setphoneNo] = useState("");
  const [vibhag, setvibhag] = useState([])
  const [daitva, setDaitva] = useState([])
  const [filteredDaitva, setFilteredDaitva] = useState([])
  const [shakhanagar, setShakhanagar] = useState([])
  const [basti, setBasti] = useState([])
  const [shaka, setShaka] = useState([])
  const [shikshan, setShikshan] = useState([])
  const [selectedShakaNagar, setSelectedShakaNagar] = useState('')
  const [selectedBasti, setSelectedBasti] = useState('')
  const [isSubmiting, setIsSubmiting] = useState(false)

  console.log('selectedShakaNagar', selectedShakaNagar)
  console.log('basti', basti)
  console.log('filteredDaitva', filteredDaitva)
  // console.log("phoneNo", phoneNo);

  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (name === 'shaka_nagar') {
      setUser((prevState) => ({ ...prevState, basti: '' }))
      setUser((prevState) => ({ ...prevState, shaka: '' }))
      setBasti([])
      setShaka([])
      setSelectedShakaNagar(value)
    }
    if (name === 'basti') {
      setUser((prevState) => ({ ...prevState, shaka: '' }))
      const valuebasti = value !== 'null' ? value : null
      setShaka([])
      setSelectedBasti(valuebasti)
    }
    if (name === 'shaka') {
      // setShaka(value !== 'null' ? value : null)
    }

    if (name === 'image') {
      setUser((prevState) => ({
        ...prevState,
        image: files[0],
      }))
      setImageShow(window.URL.createObjectURL(files[0]))
    } else {
      setUser((prevState) => ({ ...prevState, [name]: value }))
      if (name === 'daitva_of') {
        setUser((prevState) => ({ ...prevState, daitva: '' }))
        const sortedDaitva = daitva.filter((item) => item.daitva_of == value)
        console.log('karan', sortedDaitva)

        setFilteredDaitva(sortedDaitva)
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vibhagResponse = await axios.get(`${apibaseUrl}get/vibhag`)
        const daitvaResponse = await axios.get(`${apibaseUrl}get/daitva`)
        const shakhanagarResponse = await axios.get(
          `${apibaseUrl}get/shaka-nagar`
        )
        // const bastiResponse = await axios.get(
        //   'http://localhost/CI/public/get/basti'
        // )
        // const shakaResponse = await axios.get(
        //   'http://localhost/CI/public/get/shaka'
        // )
        const shikshanResponse = await axios.get(`${apibaseUrl}/get/shikshan`)

        console.log('vibhag response', vibhagResponse.data)
        // console.log("daitva response", daitvaResponse.data);
        if (vibhagResponse.data.status === 200) {
          setvibhag(vibhagResponse.data.data)

          // Redirect to another page upon success
          // navigate('/')
        }
        if (daitvaResponse.data.status === 200) {
          setDaitva(daitvaResponse.data.data)
        }
        if (shakhanagarResponse.data.status === 200) {
          setShakhanagar(shakhanagarResponse.data.data)
        }
        // if (shakhanagarResponse.data.status === 200) {
        //   setBasti(bastiResponse.data.data)
        // }
        // if (shakaResponse.data.status === 200) {
        //   setShaka(shakaResponse.data.data)
        // }
        if (shikshanResponse.data.status === 200) {
          setShikshan(shikshanResponse.data.data)
        }
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error)
      }
    }

    fetchData() // Call the fetchData function
  }, []) // Ensure that the dependency array is provided and empty for a one-time effect
  // useEffect(() => {
  //   const fetchShakaData = async () => {
  //     await axios.get(`http://localhost/CI/public/get/shaka/by-basti`);
  //   };
  //   fetchShakaData(selectedBasti);
  // }, [selectedBasti]);
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
  useEffect(() => {
    const fetchshakaData = async () => {
      const { data } = await axios.get(
        `${apibaseUrl}get/shaka/by-basti/${selectedBasti}`
      )
      setShaka(data.data)
    }
    if (selectedBasti && selectedBasti !== null) {
      fetchshakaData(selectedBasti)
    }
  }, [selectedBasti])

  console.log('outer user', user)

  const submitHandler = async (e) => {
    e.preventDefault()
    setIsSubmiting(true)
    console.log('user', user)
    try {
      const phoneNo = user.phone_no.startsWith('+91')
        ? user.phone_no
        : '+91' + user.phone_no
      const formDatas = new FormData()

      formDatas.append('file', user.image)
      formDatas.append('name', user.name)
      formDatas.append('age', user.age)
      formDatas.append('phone_no', user.phone_no)
      formDatas.append('address', user.address)
      formDatas.append('city', user.city)
      formDatas.append('nagar', user.nagar)
      formDatas.append('accupation', user.occupation)
      formDatas.append('shaka_nagar', user.shaka_nagar)
      formDatas.append('basti', user.basti)
      formDatas.append('shaka', user.shaka)
      formDatas.append('shikshan', user.shikshan)
      formDatas.append('vibhag', user.vibhag)
      formDatas.append('daitva', user.daitva)
      formDatas.append('daitva_of', user.daitva_of)
      formDatas.append('role', 'user')
      formDatas.append('near_by', 'near_by')

      console.log('formdata', formDatas)

      const response = await axios.post(
        'http://localhost/CI/public/users/create',
        formDatas,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      navigate('/welcomepage')
    } catch (error) {
      setIsSubmiting(false)
      // console.log("formDatas", formDatas);
      // navigate("/");
    }
  }
  return (
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
                <h2 className="form-title">पंजीयन करे</h2>

                <div className="input-field">
                  <div className="main-img">
                    <div className="">
                      <div className="heading">
                        <h5 className="input-title">स्वयं की जानकारी</h5>
                      </div>
                      <div className="left तुम">
                        <div className="form-g">
                          <input
                            type="text"
                            className="form-input"
                            name="name"
                            id="name"
                            placeholder="नाम"
                            required
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-g">
                          <input
                            type="number"
                            className="form-input"
                            name="age"
                            id="age"
                            placeholder="उम्र"
                            required
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-g">
                          <input
                            type="text"
                            className="form-input"
                            name="address"
                            id="address"
                            placeholder="पता"
                            required
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-g">
                          <input
                            type="text"
                            className="form-input"
                            name="city"
                            id="city"
                            placeholder="शहर"
                            required
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-g">
                          <input
                            type="text"
                            className="form-input"
                            name="nagar"
                            id="nagar"
                            placeholder="नगर"
                            required
                            onChange={handleChange}
                          />
                        </div>
                        <select
                          name="shikshan"
                          id="shikshan"
                          className="dropdown form-g form-input"
                          required={!user?.shikshan}
                          onChange={handleChange}
                          defaultValue=""
                        >
                          <option value="" disabled hidden>
                            शिक्षण चुनें
                          </option>
                          {shikshan.map((shikshan, index) => (
                            <option key={index.id} value={shikshan.id}>
                              {shikshan.name}
                            </option>
                          ))}
                        </select>

                        <select
                          name="occupation"
                          id="occupation"
                          className="dropdown form-g form-input"
                          required={!user.occupation}
                          onChange={handleChange}
                          defaultValue="" // Ensure no option is selected by default
                        >
                          <option value="" disabled hidden>
                            व्यवसाय चुनें
                          </option>
                          <option value="व्यवसाय">व्यवसाय</option>
                          <option value="नोकरी">नोकरी</option>
                        </select>
                      </div>
                    </div>

                    <div className="professional-info">
                      <div className=" heading">
                        <h5 className="input-title padding">संघ की जानकारी</h5>
                      </div>
                      <div className=" left तुम">
                        <select
                          name="vibhag"
                          id="vibhag"
                          className="dropdown form-g form-input"
                          required={!user?.vibhag}
                          onChange={handleChange}
                          defaultValue=""
                        >
                          <option value="" disabled hidden>
                            विभाग चुनें
                          </option>
                          {vibhag.map((vibhag, index) => (
                            <option key={index.id} value={vibhag.id}>
                              {vibhag.name}
                            </option>
                          ))}
                        </select>
                        <select
                          name="daitva_of"
                          id="daitva_of"
                          className="dropdown form-g form-input"
                          // required={!user.daitva_of}
                          required
                          onChange={handleChange}
                          // defaultValue="" // Ensure no option is selected by default
                          value={user.daitva_of}
                        >
                          <option value="" disabled hidden>
                            दायित्व क्षेत्र चुनें
                          </option>
                          <option value="महानगर">महानगर</option>
                          <option value="नगर">नगर</option>
                          <option value="बस्ती">बस्ती</option>
                        </select>
                        <select
                          name="daitva"
                          id="daitva"
                          className="dropdown form-g form-input"
                          // required={!user?.daitva}
                          required
                          onChange={handleChange}
                          value={user.daitva}
                        >
                          <option value="" disabled hidden>
                            दायित्व चुनें
                          </option>
                          {filteredDaitva.length > 0 ? (
                            filteredDaitva.map((daitva, index) => (
                              <option key={index.id} value={daitva.id}>
                                {daitva.name}
                              </option>
                            ))
                          ) : (
                            <option value="">कोई दायित्व नही</option>
                          )}
                        </select>
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
                        <select
                          name="basti"
                          id="basti"
                          className="dropdown form-g form-input"
                          // required={!user?.basti}
                          required
                          value={user.basti}
                          onChange={handleChange}
                          // defaultValue=""
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
                        <select
                          name="shaka"
                          id="shaka"
                          className="dropdown form-g form-input"
                          // required={!user?.shaka}
                          required
                          onChange={handleChange}
                          // defaultValue=""
                          value={user.shaka}
                        >
                          <option value="" disabled hidden>
                            शाखा चुनें
                          </option>
                          {shaka.length > 0 ? (
                            shaka.map((shaka, index) => (
                              <option key={index.id} value={shaka.id}>
                                {shaka.name}
                              </option>
                            ))
                          ) : (
                            <option value="">कोई शाखा नहीं</option>
                          )}
                        </select>
                        <div className="form-g phone-code">
                          <div className="country-code form-input">+91</div>
                          <input
                            type="tel"
                            className="form-input code-input"
                            name="phone_no"
                            id="phone_no"
                            placeholder="मों.नंबर"
                            required
                            value={user.phone_no}
                            onChange={handleChange}
                            maxLength={10}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="input-img">
                    <div className="photo-div">
                      <div className="preview-div">
                        {imageShow ? (
                          <div className="preview">
                            <img
                              src={imageShow}
                              alt="Selected"
                              className="img-avtar"
                            />
                          </div>
                        ) : (
                          <label htmlFor="fileInput" className="uploadButton">
                            <img
                              src={baseUrl + `assets/user.jpg`}
                              alt="Selected"
                              className="img-avtar"
                            />
                          </label>
                        )}
                      </div>
                      <div>
                        <div className="upload-btn">
                          <label htmlFor="fileInput" className="uploadButton">
                            फोटो चुनें
                          </label>
                        </div>
                        <div
                          style={{
                            position: 'absolute',
                            overflow: 'hidden',
                            width: 0,
                            height: 0,
                          }}
                        >
                          <input
                            id="fileInput"
                            type="file"
                            name="image"
                            onChange={handleChange}
                            required
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
  )
}
