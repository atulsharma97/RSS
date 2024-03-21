import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateBasti = () => {
  const apibaseUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    shaka_nagar: "",
  });
  const [userBack, setUserBack] = useState({
    name: "",
    shaka_nagar: "",
  });

  const [shakhanagar, setShakhanagar] = useState([]);
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

    if (name == "basti") {
      setUser((prevState) => ({ ...prevState, name: value }));
    }
    if (name == "shaka_nagar") {
      setSelectedShakaNagar(value);
      setUser((prevState) => ({ ...prevState, shaka_nagar: value }));
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
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${apibaseUrl}basti/create`, {
        name: user.name,
        shaka_nagar: user.shaka_nagar,
      });
      toast.success(data.data);
      // navigate("/nagar/create-nagars");
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
          <Link to="/basti">
            <a>बस्ती</a>
          </Link>
        </li>
        <li>
          <Link to="/create-Bastis">
            <a className="active">बस्ती जोड़ें</a>
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
                  <h2 className="form-title">बस्ती जोड़ें </h2>

                  <div className="input-field1">
                    <div className="main-img">
                      <div className=" left तुम">
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
                          onChange={handleChange}
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

                        <div className="form-g">
                          <input
                            type="text"
                            className="form-input"
                            name="basti"
                            id="basti"
                            placeholder="बस्ती"
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
                      value={isSubmiting ? "बस्ती जोडी जा रही है..." : "जोड़ें"}
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

export default CreateBasti;
