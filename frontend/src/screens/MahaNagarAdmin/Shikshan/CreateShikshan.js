import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateShikshan = () => {
  const apibaseUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
  });
  const [userBack, setUserBack] = useState({
    name: "",
  });

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

    if (name == "shikshan") {
      setUser((prevState) => ({ ...prevState, name: value }));
    }

    setUser((prevState) => ({ ...prevState, [name]: value }));
    setUserBack((prevState) => ({ ...prevState, [name]: value }));
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

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${apibaseUrl}shikshan/create`, {
        name: user.name,
      });
      toast.success(data.data);
      // navigate("/nagar");
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
          <Link to="/shikshan">
            <a>शिक्षण</a>
          </Link>
        </li>
        <li>
          <Link to="/create-shikshan">
            <a className="active">शिक्षण जोड़ें</a>
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
                  <h2 className="form-title"> शिक्षण जोड़ें </h2>

                  <div className="input-field1">
                    <div className="">
                      <div className="">
                        <input
                          type="text"
                          className="form-input"
                          name="shikshan"
                          id="shikshan"
                          placeholder="शिक्षण"
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
                  <div className="form-group">
                    <input
                      type="submit"
                      name="submit"
                      id="submit"
                      className={
                        isSubmiting ? "form-submit-1 " : "form-submit submit1"
                      }
                      disabled={isSubmiting}
                      value={isSubmiting ? "शिक्षण जोड़ा जा रहा है..." : "जोड़ें"}
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

export default CreateShikshan;
