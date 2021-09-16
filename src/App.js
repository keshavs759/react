import "./App.css";
import Login from "./pages/Login";
import { UserContext } from "./UserContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

function App() {

  const [isAuth, setisAuth] = useState(false);
  const [user, setUser] = useState(null);

 
  const value = {isAuth, setisAuth , user , setUser}
  
  let name = "";

  if (user) {
    name = user["username"];
  }else{
    name = "Guest";

  }

  return (
    <>
      <Router>

        <UserContext.Provider value={value}>
          <Header/>
        <Switch>

          <Route exact path="/login">
            <Login  />
          </Route>
          <Route exact path="/">
          <Body />
          </Route>
          <Route exact path="/about">
          <p>Welcome {name}, </p> <br/>
          <p>This is About Us Section</p>
          </Route>

          <Route exact path="/doc">
          <p>Welcome {name}, </p> <br/>
          <p>This is Documentation Section</p>
          </Route>

          <Route path="*">
            <p>404 Error Please check the url you have entered</p>
          </Route>
          </Switch>

          </UserContext.Provider>
          <Footer />

      </Router>

    </>
  );
}

export default App;
