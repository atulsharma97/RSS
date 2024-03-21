import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

export default function Registration() {
  const apibaseUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_ASSETS_URL;

  const [user, setUser] = useState({
    name: "",
    age: null,
    phone_no: "",
    address: "",
    city: "",
    nagar: "",
    occupation: "",
    shaka_nagar: "",
    image: "",
    basti: "",
    shaka: "",
    shikshan: "",
    vibhag: "",
    daitva: "",
    daitva_of: "",
  });
  // const [userBack, setUserBack] = useState({
  //   name: "",
  //   phone_no: "",
  //   address: "",
  //   city: "",
  //   nagar: "",
  //   occupation: "",
  //   shaka_nagar: "",
  //   image: "",
  //   basti: "",
  //   shaka: "",
  //   shikshan: "",
  //   vibhag: "",
  //   daitva: "",
  //   daitva_of: "",
  // });
  const [imageShow, setImageShow] = useState("");
  const [vibhag, setvibhag] = useState([]);
  const [daitva, setDaitva] = useState([]);
  const [filteredDaitva, setFilteredDaitva] = useState([]);
  const [shakhanagar, setShakhanagar] = useState([]);
  const [basti, setBasti] = useState([]);
  const [shaka, setShaka] = useState([]);
  const [shikshan, setShikshan] = useState([]);
  const [selectedShakaNagar, setSelectedShakaNagar] = useState("");
  const [selectedBasti, setSelectedBasti] = useState("");
  const [age, setAge] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [latestInputValue, setLatestInputValue] = useState("");
  const [activeInput, setActiveInput] = useState(null);

  // const handleBlur = async (e) => {
  //   try {
  //     const { name, value } = e.target;
  //     console.log("value ", value);
  //     const originalValue = userBack[name] || value;
  //     const lowerCaseValue = originalValue.toLowerCase();
  //     const response = await fetch(
  //       `https://api.mymemory.translated.net/get?q=${lowerCaseValue}&langpair=en|hi`
  //     );

  //     const data = await response.json();
  //     const matches = data.matches;
  //     const matchWithIdZero = matches.find((match) => match.id === 0);
  //     // const convertedData = matchWithIdZero ? matchWithIdZero.translation : "";
  //     let translation = "";
  //     if (matchWithIdZero) {
  //       translation = decodeUnicode(matchWithIdZero.translation);
  //     } else {
  //       translation = originalValue; // Use original value if translation is not available
  //     }

  //     // const translation = decodeUnicode(convertedData) || "";
  //     console.log("translation ", translation);
  //     setUser((prevState) => ({ ...prevState, [name]: translation }));
  //     e.target.value = translation;
  //     handleChange(e);
  //   } catch (error) {
  //     console.error("Error translating text:", error);
  //   }
  // };
  // // Function to decode Unicode escape sequences
  // const decodeUnicode = (str) => {
  //   return str.replace(/\\u[\dA-F]{4}/gi, (match) =>
  //     String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16))
  //   );
  // };

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setActiveInput(name);
    if (
      name === "name" ||
      name === "address" ||
      name === "city" ||
      name === "nagar"
    ) {
      // Apply translation only for specific input fields
      debounceTranslation(value);
    }

    if (name === "shaka_nagar") {
      setUser((prevState) => ({ ...prevState, basti: "" }));
      setUser((prevState) => ({ ...prevState, shaka: "" }));
      setBasti([]);
      setShaka([]);
      setSelectedShakaNagar(value);
    }
    if (name === "basti") {
      setUser((prevState) => ({ ...prevState, shaka: "" }));
      const valuebasti = value !== "null" ? value : null;
      setShaka([]);
      setSelectedBasti(valuebasti);
    }
    // if (name === "shaka") {
    //   // setShaka(value !== 'null' ? value : null)
    // }

    if (name === "image") {
      setUser((prevState) => ({
        ...prevState,
        image: files[0],
      }));
      setImageShow(window.URL.createObjectURL(files[0]));
    } else {
      let newValue = value;
      if (name === "age" && !isNaN(value)) {
        if (value < 0) {
          newValue = 0;
        } else if (value >= 150) {
          newValue = 150;
        }
        setUser((prevState) => ({
          ...prevState,
          age: newValue,
        }));
      } else {
        setUser((prevState) => ({ ...prevState, [name]: value }));
        // setUserBack((prevState) => ({ ...prevState, [name]: value }));
        if (name === "daitva_of") {
          setUser((prevState) => ({ ...prevState, daitva: "" }));
          setUser((prevState) => ({ ...prevState, daitva_of: value }));
          const sortedDaitva = daitva.filter((item) => item.daitva_of == value);
          setFilteredDaitva(sortedDaitva);
        }
      }
    }
    setLatestInputValue(value);
  };

  useEffect(() => {
    if (latestInputValue) {
      debounceTranslation(latestInputValue);
    }
  }, [latestInputValue]);

  const debounceTranslation = debounce(async (value) => {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${value}&langpair=en|hi`
      );
      const data = await response.json();
      const matches = data.matches;
      displaySuggestions(matches);
    } catch (error) {
      console.error("Error fetching translation suggestions:", error);
    }
  }, 300);

  const displaySuggestions = (matches) => {
    const suggestions = matches.map((match) => match.translation);
    setSuggestions(suggestions);
  };

  const selectSuggestion = (suggestion) => {
    if (activeInput) {
      setUser((prevState) => ({
        ...prevState,
        [activeInput]: suggestion,
      }));
      setSuggestions([]);
    }
    // setSuggestions([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vibhagResponse = await axios.get(`${apibaseUrl}get/vibhag`);
        const daitvaResponse = await axios.get(`${apibaseUrl}get/daitva`);
        const shakhanagarResponse = await axios.get(
          `${apibaseUrl}get/shaka-nagar`
        );
        const shikshanResponse = await axios.get(`${apibaseUrl}/get/shikshan`);
        if (vibhagResponse.data.status === 200) {
          setvibhag(vibhagResponse.data.data);
        }
        if (daitvaResponse.data.status === 200) {
          setDaitva(daitvaResponse.data.data);
        }
        if (shakhanagarResponse.data.status === 200) {
          setShakhanagar(shakhanagarResponse.data.data);
        }
        if (shikshanResponse.data.status === 200) {
          setShikshan(shikshanResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBastiData = async () => {
      const { data } = await axios.get(
        `${apibaseUrl}get/basti/by-shaka-nagar/${selectedShakaNagar}`
      );
      setBasti(data.data);
    };
    if (selectedShakaNagar && selectedShakaNagar !== null) {
      fetchBastiData(selectedShakaNagar);
    }
  }, [selectedShakaNagar]);
  useEffect(() => {
    const fetchshakaData = async () => {
      const { data } = await axios.get(
        `${apibaseUrl}get/shaka/by-basti/${selectedBasti}`
      );
      setShaka(data.data);
    };
    if (selectedBasti && selectedBasti !== null) {
      fetchshakaData(selectedBasti);
    }
  }, [selectedBasti]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    if (user.phone_no.length !== 10) {
      alert("कृपया 10 अंकों का नंबर डाले");
      setIsSubmiting(false);
      return; // Exit function early if phone number length is not 10
    }
    try {
      const formDatas = new FormData();

      formDatas.append("file", user.image);
      formDatas.append("name", user.name);
      formDatas.append("age", user.age);
      formDatas.append("phone_no", user.phone_no);
      formDatas.append("address", user.address);
      formDatas.append("city", user.city);
      formDatas.append("nagar", user.nagar);
      formDatas.append("accupation", user.occupation);
      formDatas.append("shaka_nagar", user.shaka_nagar);
      formDatas.append("basti", user.basti);
      formDatas.append("shaka", user.shaka);
      formDatas.append("shikshan", user.shikshan);
      formDatas.append("vibhag", user.vibhag);
      formDatas.append("daitva", user.daitva);
      formDatas.append("daitva_of", user.daitva_of);
      formDatas.append("role", "user");
      formDatas.append("near_by", "near_by");

      console.log("formdata", formDatas);

      const response = await axios.post(
        "http://localhost/CI/public/users/create",
        formDatas,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/welcomepage");
    } catch (error) {
      setIsSubmiting(false);
      console.log("error", error);

      toast.error(error.response.data.message);
      // toast.error(error.message);
      // console.log("formDatas", formDatas);
      // navigate("/");
    }
  };
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
                            value={user.name}
                          />
                          {activeInput === "name" &&
                            suggestions.length > 0 &&
                            user.name !== "" && (
                              <ul className="suggestions-dropdown">
                                {suggestions.map((suggestion, index) => (
                                  <li
                                    key={index}
                                    onClick={() => selectSuggestion(suggestion)}
                                  >
                                    {suggestion}
                                  </li>
                                ))}
                              </ul>
                            )}
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
                            value={user.age}
                            min="0"
                            max="150"
                            // autoFocus
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
                            value={user.address}
                          />
                          {activeInput === "address" &&
                            suggestions.length > 0 &&
                            user.address !== "" && (
                              <ul className="suggestions-dropdown">
                                {suggestions.map((suggestion, index) => (
                                  <li
                                    key={index}
                                    onClick={() => selectSuggestion(suggestion)}
                                  >
                                    {suggestion}
                                  </li>
                                ))}
                              </ul>
                            )}
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
                            value={user.city}
                          />
                          {activeInput === "city" &&
                            suggestions.length > 0 &&
                            user.city !== "" && (
                              <ul className="suggestions-dropdown">
                                {suggestions.map((suggestion, index) => (
                                  <li
                                    key={index}
                                    onClick={() => selectSuggestion(suggestion)}
                                  >
                                    {suggestion}
                                  </li>
                                ))}
                              </ul>
                            )}
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
                            value={user.nagar}
                          />
                          {activeInput === "nagar" &&
                            suggestions.length > 0 &&
                            user.nagar !== "" && (
                              <ul className="suggestions-dropdown">
                                {suggestions.map((suggestion, index) => (
                                  <li
                                    key={index}
                                    onClick={() => selectSuggestion(suggestion)}
                                  >
                                    {suggestion}
                                  </li>
                                ))}
                              </ul>
                            )}
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
                            <option key={index} value={shikshan.id}>
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
                            <option key={index} value={vibhag.id}>
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
                              <option key={index} value={daitva.id}>
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
                            <option key={index} value={shakanagar.id}>
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
                              <option key={index} value={basti.id}>
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
                              <option key={index} value={shaka.id}>
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
                            position: "absolute",
                            overflow: "hidden",
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
                    className={isSubmiting ? "form-submit-1 " : "form-submit"}
                    disabled={isSubmiting}
                    value={isSubmiting ? "पंजीयन हो रहा है..." : "पंजीयन "}
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
