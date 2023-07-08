import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const [email, emailchange] = useState("");

  const [password, passwordchange] = useState("");

  const emailChange = (e) => {
    emailchange(e.target.value);
  };

  const passwordChange = (e) => {
    passwordchange(e.target.value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const res = await axios.get(
      `http://localhost:8090/getresponse/${email}/${password}`
    );

    if (res.data === "wrong mail") {
      alert("Email doesn't exist");
    } else if (res.data === "wrong pass") {
      alert("Wrong Password");
    } else {
      navigate("/employees");
    }
  };

  const registerPage = () => {
    navigate("/register");
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://wallpaperaccess.com/full/452101.jpg')`,
        height: "750px",
      }}
    >
      <div className="Auth-form-container">
        <div
          className="Auth-form"
          style={{ backgroundColor: "black", color: "white" }}
        >
          <div className="Auth-form-content">
            <h1> &nbsp;&nbsp;SignIn !</h1>
            <br></br>

            <form className="containe" onSubmit={handlesubmit}>
              <div className="">
                <label className="label">&nbsp; Email  </label>&emsp;&emsp;&nbsp;
                
                <input type="text" required onChange={emailChange}></input>
              </div>

              <div className="">
                <label className="label" required>
                  Password
                </label>&emsp;

                <input
                  type="password"
                  required
                  onChange={passwordChange}
                ></input>
              </div>
              <br></br>

              <div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
            <br></br>

            <button className="btn btn-outline-primary" onClick={registerPage}>
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
