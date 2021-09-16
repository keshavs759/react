import React, { useState, useRef,  useContext } from "react";
import { useHistory} from "react-router";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { UserContext } from "../UserContext";
import { user_details } from "../utils/user_details";

import "../css/login-page.css";
export default function Login() {
  const {setisAuth , setUser} = useContext(UserContext);

 
  const history = useHistory()

  const [userName, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");

  const inputRef = useRef(null);
  const inputPassRef = useRef(null);

    // let we have username and password as
    let user_db = 'username';
    let pass_db = 'password';


  const submit =  async (e) => {
    if(userName === user_db && password === pass_db){    
      e.preventDefault() 
      Cookies.set('isLoggedIn','true')
      const user = await user_details();
      Cookies.set('user',`${user}`)
      setUser(user);
      setisAuth(true)
      history.push('/')


    }else{
        e.preventDefault();
        setUsernameInput("");
        setPassword("");
        inputRef.current.placeholder = "Invalid Username or Password";
        inputPassRef.current.placeholder = "Invalid Username or Password";
        inputRef.current.style.border = "1px solid red";
        inputPassRef.current.style.border = "1px solid red";

    }
  };

  return (
    <div> 
      <div className="body-content">
        <div className="login-container">
          <h2>Login</h2>
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
                  id="passWord"
                  ref = {inputPassRef}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Test Password : password"
                  required
                />
              </div>

              <div className="form-btns">
                <button type="submit">Login</button>
                <div className="options">
                  <Link to="#">Sign Up</Link>
                  <Link to="#">Forget Password?</Link>
                </div>
              </div>
            </form>
          </div>
          <hr />
          <div className="login-options">
            <button className="facebook">Login with Facebook</button>
            <button className="google">Login with Google</button>
          </div>
        </div>
      </div>
    </div>
  );
}
