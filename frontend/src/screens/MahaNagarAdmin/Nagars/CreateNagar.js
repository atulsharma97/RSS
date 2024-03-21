// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import LoadingBox from "../../../components/LoadingBox";

// const CreateNagar = () => {
//   const apibaseUrl = process.env.REACT_APP_API_URL;

//   const navigate = useNavigate();

//   const { id } = useParams();

//   const [user, setUser] = useState({
//     maha_nagar: "",
//     name: "",
//   });
//   const [userBack, setUserBack] = useState({
//     maha_nagar: "",
//     name: "",
//   });

//   console.log("name", user.name);

//   const [isSubmiting, setIsSubmiting] = useState(false);
//   const [blurLoad, setBlurLoad] = useState(false);
//   // console.log("maha_nagar", maha_nagar);
//   // console.log("shaka_nagar", shaka_nagar);
//   const handleBlur = async (e) => {
//     setBlurLoad(false);
//     try {
//       const { name, value } = e.target;
//       console.log("value ", value);
//       const originalValue = userBack[name] || value;
//       const lowerCaseValue = originalValue.toLowerCase();
//       const response = await fetch(
//         `https://api.mymemory.translated.net/get?q=${lowerCaseValue}&langpair=en|hi`
//       );
//       setBlurLoad(true);
//       const data = await response.json();
//       const matches = data.matches;
//       const matchWithIdZero = matches.find((match) => match.id === 0);
//       // const convertedData = matchWithIdZero ? matchWithIdZero.translation : "";
//       let translation = "";
//       if (matchWithIdZero) {
//         translation = decodeUnicode(matchWithIdZero.translation);
//       } else {
//         translation = originalValue; // Use original value if translation is not available
//       }

//       // const translation = decodeUnicode(convertedData) || "";
//       console.log("translation ", translation);
//       setUser((prevState) => ({ ...prevState, [name]: translation }));
//       e.target.value = translation;
//       handleChange(e);
//     } catch (error) {
//       console.error("Error translating text:", error);
//     }
//   };
//   // Function to decode Unicode escape sequences
//   const decodeUnicode = (str) => {
//     return str.replace(/\\u[\dA-F]{4}/gi, (match) =>
//       String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16))
//     );
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name == "nagar") {
//       setUser((prevState) => ({ ...prevState, name: value }));
//       console.log("handlename", value);
//     }

//     setUser((prevState) => ({ ...prevState, [name]: value }));
//     setUserBack((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       if (blurLoad === true) {
//         const { data } = await axios.post(`${apibaseUrl}shaka-nagar/create`, {
//           name: user.name,
//         });
//         toast.success(data.data);
//       } // navigate("/nagar");
//     } catch (err) {
//       toast.error(err.response?.data?.message);
//     } finally {
//       setIsSubmiting(false);
//     }
//   };

//   return (
//     <>
//       <ul className="nav-style1">
//         <li>
//           <Link to="/nagar">
//             <a>नगर</a>
//           </Link>
//         </li>
//         <li>
//           <Link to="/create-nagars">
//             <a className="active">नगर जोड़ें</a>
//           </Link>
//         </li>
//       </ul>
//       <div>
//         <div className="signup-main">
//           <section className="signup">
//             <div className="container1">
//               <div className="signup-content">
//                 <form
//                   method="POST"
//                   id="signup-form"
//                   className="sform"
//                   onSubmit={submitHandler}
//                 >
//                   <h2 className="form-title"> नगर जोड़ें </h2>

//                   <div className="input-field1">
//                     <div className="">
//                       <div className=" left तुम">
//                         <select
//                           name="maha-nagar"
//                           lang="hi"
//                           id="maha-nagar"
//                           className="dropdown form-g form-input"
//                           // required
//                           onChange={handleChange}
//                           value={user.maha_nagar}
//                         >
//                           <option value="" disabled hidden>
//                             उज्जैन
//                           </option>
//                           {/* <option value="nagarAdmin">नगर</option>
//                             <option value="bastiAdmin">बस्ती</option> */}
//                         </select>

//                         <div className="form-g">
//                           <input
//                             type="text"
//                             className="form-input"
//                             lang="hi"
//                             name="nagar"
//                             id="nagar"
//                             placeholder="नगर"
//                             required
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <input
//                       type="submit"
//                       name="submit"
//                       id="submit"
//                       className={isSubmiting ? "form-submit-1 " : "form-submit"}
//                       disabled={isSubmiting}
//                       value={isSubmiting ? "नगर जोड़ा जा रहा है..." : "जोड़ें"}
//                     />
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateNagar;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBox from "../../../components/LoadingBox";

const CreateNagar = () => {
  const apibaseUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    maha_nagar: "",
    name: "",
  });
  const [userBack, setUserBack] = useState({
    maha_nagar: "",
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
    const { name, value } = e.target;

    if (name === "nagar") {
      setUser((prevState) => ({ ...prevState, name: value }));
    }
    setUser((prevState) => ({ ...prevState, [name]: value }));
    setUserBack((prevState) => ({ ...prevState, [name]: value }));

    // Call translation API for suggestions
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
      const { data } = await axios.post(`${apibaseUrl}shaka-nagar/create`, {
        name: user.name,
      });
      toast.success(data.data);
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
          <Link to="/nagar">
            <a>नगर</a>
          </Link>
        </li>
        <li>
          <Link to="/create-nagars">
            <a className="active">नगर जोड़ें</a>
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
                  <h2 className="form-title"> नगर जोड़ें </h2>

                  <div className="input-field1">
                    <div className="main-img">
                      <div className=" left2 तुम">
                        <select
                          name="maha-nagar"
                          lang="hi"
                          id="maha-nagar"
                          className="dropdown form-g form-input"
                          onChange={handleChange}
                          value={user.maha_nagar}
                        >
                          <option value="" disabled hidden>
                            उज्जैन महानगर
                          </option>
                          <option value="">उज्जैन महानगर</option>
                        </select>

                        <div className="form-g">
                          <input
                            type="text"
                            className="form-input"
                            lang="hi"
                            name="nagar"
                            id="nagar"
                            placeholder="नगर"
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
                      value={isSubmiting ? "नगर जोड़ा जा रहा है..." : "जोड़ें"}
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

export default CreateNagar;
