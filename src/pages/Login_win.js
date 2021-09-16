import React, { useState, useRef, useContext } from "react";
import account from "../img/win_login/account-image.png";

import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../UserContext";
import { user_details } from "../utils/user_details";

import "../css/login-page-win.css";
export default function Login_win() {
  const { setisAuth, setUser } = useContext(UserContext);

  const history = useHistory();

  const [userName, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");

  const [display, setDisplay] = useState(false)
 
  const inputRef = useRef(null);
  const inputPassRef = useRef(null);
  const signInOpt = useRef(null)

  // let we have username and password as
  let user_db = "username";
  let pass_db = "password";

  const submit = async (e) => {
    if (userName === user_db && password === pass_db) {
      e.preventDefault();
      Cookies.set("isLoggedIn", "true");
      const user = await user_details();
      Cookies.set("user", `${user}`);
      setUser(user);
      setisAuth(true);
      history.push("/");
    } else {
      e.preventDefault();
      setUsernameInput("");
      setPassword("");
      inputRef.current.placeholder = "Invalid Username or Password";
      inputPassRef.current.placeholder = "Invalid Username or Password";
      inputRef.current.style.border = "1px solid red";
      inputPassRef.current.style.border = "1px solid red";
    }
  };

  const showOpt = ()=>{
    setDisplay(!display)
  }

  return (
    <>
      <div className="background"></div>
      <div className="body-content">
        <div className="login-container">
          <div className="logo">
            <img src={account} alt="account" srcset="" />
          </div>
          <h2>User Login</h2>
          <div className="login-form">
            <form onSubmit={submit}>
              <div className="form-item">
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  ref = {inputRef}
                  value={userName}
                  onChange={(e) => {
                    setUsernameInput(e.target.value);
                  }}
                  placeholder="Test Username: username"
                  required
                />
              </div>
              <div className="form-item">
                <input
                  type="password"
                  name="passWord"
                  id="password"
                  ref = {inputPassRef}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Test Password : password"
                  required
                />
                <button type='submit' className="login">&#10095;</button>
              </div>

              <div className="other-options">
                <p onClick={()=>{showOpt()}} className="signInBtn">Sign-in options</p>
                <p className="signInBtn">Sign-Up</p>
              </div>
            </form>
          </div>
        </div>
        <div ref={signInOpt}  className = {display ? "other-option-tab-cover show": "other-option-tab-cover"}>
          <div className="other-option-tab">
            <button className="fb">Login with Facebook</button>
            <button className="gl">Login with Google</button>
            <button className="pr">Password Reset</button>
          </div>
        </div>
      </div>
    </>
  );
}
