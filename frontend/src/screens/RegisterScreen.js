import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export default function RegisterScreen() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    age: "",
    phone_no: "",
    address: "",
    city: "",
    nagar: "",
    occupation: "",
    shaka_nagar: "",
    image: "",
    basti: "",
    shakha: "",
    shikshan: "",
    vibhag: "",
    daitva: "",
  });
  const [imageShow, setImageShow] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setUser((prevState) => ({
        ...prevState,
        image: files[0],
      }));
      setImageShow(window.URL.createObjectURL(files[0]));
    } else {
      setUser((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("user", user);
    const formDatas = new FormData();

    formDatas.append("image", user.image);
    formDatas.append("name", user.name);
    formDatas.append("age", user.age);
    formDatas.append("phone_no", user.phone_no);
    formDatas.append("address", user.address);
    formDatas.append("city", user.city);
    formDatas.append("nagar", user.nagar);
    formDatas.append("occupation", user.occupation);
    formDatas.append("shaka_nagar", user.shaka_nagar);
    formDatas.append("basti", user.basti);
    formDatas.append("shakha", user.shakha);
    formDatas.append("shikshan", user.shikshan);
    formDatas.append("vibhag", user.vibhag);
    formDatas.append("daitva", user.daitva);

    console.log("formDatas", formDatas);
    navigate("/");
  };
  return (
    <div>
      {/* <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand className="logo" href="#home">
              RSS{" "}
              <img
                src="/assets/Rss flag.png"
                alt="Rss Flag"
                className="navicon"
              />
              <span>
                <h5>रास्ट्रीय स्वयंसेवक संघ</h5>
              </span>
            </Navbar.Brand>
          </Container>
        </Navbar>
      </> */}

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
                    <div className="left तुम">
                      <div className="form-g">
                        <input
                          type="text"
                          className="form-input"
                          name="name"
                          id="name"
                          placeholder="अपना नाम"
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
                      {/* <div className="form-g">
                      <input
                        type="text"
                        className="form-input"
                        name="nearby"
                        id="nearby"
                        placeholder="के पास में"
                         onChange={handleChange}={(e) => setNearby(e.target.value)}
                      />
                    </div> */}
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
                      <div className="form-g">
                        <input
                          type="text"
                          className="form-input "
                          name="shikshan"
                          id="shikshan"
                          placeholder="शिक्षण"
                          required
                          onChange={handleChange}
                        ></input>
                      </div>
                      {/* <div className="dropdown form-g form-input ">
                      <Link to="#">
                        व्यवसाय
                        <i className="fa-solid fa-caret-down "></i>
                      </Link>
                      <ul className="dropdown-content">
                        <li>
                          <Link to="#">व्यवसाय</Link>
                        </li>
                        <li>
                          <Link to="#">नोकरी</Link>
                        </li>
                      </ul>
                    </div> */}

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

                      {/* <div className="dropdown form-g form-input">
                      <button
                        className="btn btn-secondary dropdown-toggle form-input dbtn dropdown-btn"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        व्यवसाय चुने
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            Action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Another action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Something else here
                          </a>
                        </li>
                      </ul>
                    </div> */}
                      {/* <div className="form-group">
                      <label htmlFor="occupation" className="form-label">
                        Occupation
                      </label>
                      <select
                        className="form-select"
                        name="occupation"
                         onChange={handleChange}={""}
                        value={""}
                      >
                        <option value="student">Student</option>
                        <option value="employee">Employee</option>
                        <option value="other">Other</option>
                      </select>
                    </div> */}
                      <div className="form-g">
                        <input
                          type="text"
                          className="form-input "
                          name="vibhag"
                          id="vibhag"
                          placeholder="विभाग"
                          required
                          onChange={handleChange}
                        ></input>
                      </div>
                      <div className="form-g">
                        <input
                          type="text"
                          className="form-input "
                          name="daitva"
                          id="daitva"
                          placeholder="दायित्व"
                          required
                          onChange={handleChange}
                        ></input>
                      </div>
                      <div className="form-g">
                        <input
                          type="text"
                          className="form-input"
                          name="shaka_nagar"
                          id="shaka_nagar"
                          placeholder="शाखा नगर"
                          required
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-g">
                        <input
                          type="text"
                          className="form-input "
                          name="basti"
                          id="basti"
                          placeholder="शाखा बस्ती"
                          required
                          onChange={handleChange}
                        ></input>
                      </div>
                      <div className="form-g">
                        <input
                          type="text"
                          className="form-input "
                          name="shakha"
                          id="shakha"
                          placeholder="शाखा"
                          required
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-g">
                        <input
                          type="number"
                          className="form-input"
                          name="phone_no"
                          id="phone_no"
                          placeholder="मों.नंबर"
                          required
                          onChange={handleChange}
                        />
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
                          <img
                            src="/assets/images.png"
                            alt="Selected"
                            className="img-avtar"
                          />
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
                    className="form-submit"
                    value="पंजीयन करे"
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
