import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateShaka = () => {
  const apibaseUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    basti: "",
    shaka_nagar: "",
    name: "",
  });
  const [userBack, setUserBack] = useState({
    basti: "",
    shaka_nagar: "",
    name: "",
  });

  const [basti, setBasti] = useState([]);
  const [selectedBasti, setSelectedBasti] = useState("");
  const [shakhanagar, setShakhanagar] = useState([]);
  const [shaka, setShaka] = useState([]);
  const [selectedShakaNagar, setSelectedShakaNagar] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [latestInputValue, setLatestInputValue] = useState("");

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

    // if (name == "basti") {
    //   setBasti(value);
    //   setUser((prevState) => ({ ...prevState, basti: value }));
    // }
    if (name == "shaka_nagar") {
      setUser((prevState) => ({ ...prevState, basti: "" }));
      // setBasti([]);
      setSelectedBasti([]);
      setSelectedShakaNagar(value);
      setUser((prevState) => ({ ...prevState, shaka_nagar: value }));
    }
    if (name === "basti") {
      setUser((prevState) => ({ ...prevState, name: "" }));
      const valuebasti = value !== "null" ? value : null;
      setSelectedBasti(valuebasti);
    }
    if (name === "shaka") {
      setUser((prevState) => ({ ...prevState, name: value }));
    } else {
      setUser((prevState) => ({ ...prevState, [name]: value }));
      setUserBack((prevState) => ({ ...prevState, [name]: value }));
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
    // Extract suggestions from API response
    const suggestions = matches.map((match) => match.translation);
    setSuggestions(suggestions);
  };

  const selectSuggestion = (suggestion) => {
    setUser((prevState) => ({ ...prevState, name: suggestion }));
    setUserBack((prevState) => ({ ...prevState, name: suggestion }));
    setSuggestions([]); // Clear suggestions after selecting one
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const shakhanagarResponse = await axios.get(
          `${apibaseUrl}get/shaka-nagar`
        );

        if (shakhanagarResponse.data.status === 200) {
          setShakhanagar(shakhanagarResponse.data.data);
        }
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []);
  useEffect(() => {
    const fetchBastiData = async () => {
      const { data } = await axios.get(
        `${apibaseUrl}get/basti/by-shaka-nagar/${selectedShakaNagar}`
      );
      console.log("shaka_nagar-data", data);
      setBasti(data.data);
      console.log("setBastiAtul", data.data);
    };
    if (selectedShakaNagar && selectedShakaNagar !== null) {
      fetchBastiData(selectedShakaNagar);
    }
  }, [selectedShakaNagar]);
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${apibaseUrl}shaka/create`, {
        basti: user.basti,
        shaka_nagar: user.shaka_nagar,
        name: user.name,
      });
      toast.success(data.data);
      // navigate("/nagar/create-shakas");
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <>
      <ul className="nav-style1">
        <li>
          <Link to="/shaka">
            <a>शाखा</a>
          </Link>
        </li>
        <li>
          <Link to="/create-Shakas">
            <a className="active">शाखा जोड़ें</a>
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
                  <h2 className="form-title"> शाखा जोड़ें </h2>

                  <div className="input-field1">
                    <div className="">
                      <div className=" left1 तुम">
                        <select
                          name="maha-nagar"
                          id="maha-nagar"
                          className="dropdown form-g form-input"
                          // required
                          onChange={handleChange}
                          value={""}
                        >
                          <option value="" disabled hidden>
                            उज्जैन महानगर
                          </option>
                          <option value="">उज्जैन महानगर</option>
                        </select>
                        <select
                          name="shaka_nagar"
                          id="shaka_nagar"
                          className="dropdown form-g form-input"
                          required
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

                        <div className="form-g">
                          <input
                            type="text"
                            className="form-input"
                            name="shaka"
                            id="shaka"
                            placeholder="शाखा"
                            required
                            onChange={handleChange}
                            value={user.name}
                          />
                          {suggestions.length > 0 && user.name !== "" && (
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
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      name="submit"
                      id="submit"
                      className={
                        isSubmiting ? "form-submit-1 " : "form-submit submit1"
                      }
                      disabled={isSubmiting}
                      value={isSubmiting ? "शाखा जोडी जा रही है..." : "जोड़ें"}
                    />
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CreateShaka;
