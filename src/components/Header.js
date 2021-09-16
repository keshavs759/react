import { React, useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "../css/style.css";
import { UserContext } from "../UserContext";

import { useHistory } from "react-router";

export default function Header() {

  const { isAuth, setisAuth, user, setUser } = useContext(UserContext);

 const user_name = useRef();
  const login = useRef();
  const logoutRef = useRef();
  const history = useHistory();

  const logout = () => {
    Cookies.remove("user");
    Cookies.remove("isLoggedIn");
    setUser(null);
    setisAuth(false);
    history.push("/");
  };

  useEffect(() => {
    
    if (isAuth) {
      login.current.style.display = "none";
      user_name.current.style.display = "block";
      logoutRef.current.style.display = "block";
    } else {
      login.current.style.display = "block";
      user_name.current.style.display = "none";
      logoutRef.current.style.display = "none";
    }
  }, [isAuth]);

  let name = "";

  if (user) {
    name = user["username"];
  }
  console.log(name);
  
  return (
    <>
              <div className="Header">
        <div className="menu">
          <ul className="menuItems">
            <Link className="link" to="/">
              <li>Home</li>
            </Link>
            <Link className="link" to="/doc">
              <li>Documentation</li>
            </Link>
            <Link className="link" to="/about">
              <li>About</li>
            </Link>
          </ul>
        </div>
        <div className="endMenu">
          <p id="user-name" ref={user_name}>
            {name}
          </p>
          <Link className="link" ref={login} to="/login">
            Login
          </Link>
          <button
            className="logout"
            ref={logoutRef}
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        </div>
      </div>

 
      

    </>
  );
}
