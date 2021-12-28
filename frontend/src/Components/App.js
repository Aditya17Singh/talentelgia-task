import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./Signup";
import Header from "./Header";
import Home from "./Home";

function App() {
  const [state, setState] = useState({
    isLoggedIn: false,
    user: null,
    isVerifying: true,
  });

  function signout() {
    setState({ isLoggedIn: false, user: null, isVerifying: true });
    localStorage.removeItem("app__user");
  }

  let storageKey = localStorage["app__user"];

  useEffect(() => {
    if (storageKey) {
      fetch("http://localhost:5050/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          authorization: `${storageKey}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then(({ user }) => updateUser(user))
        .catch((errors) => console.log(errors));
    } else {
      setState({ isVerifying: false });
    }
  }, [storageKey]);

  function updateUser(user) {
    setState({ isLoggedIn: true, user, isVerifying: false });
    localStorage.setItem("app__user", user.token);
  }
  return (
    <div>
      <Router>
        <Header isLoggedIn={state.isLoggedIn} Signout={signout} />
        {state.isLoggedIn ? (
          <AuthenticatedApp
            user={state.user}
            updateUser={updateUser}
          />
        ) : (
          <UnAuthenticatedApp updateUser={updateUser} />
        )}
      </Router>
    </div>
  );
}

function AuthenticatedApp(props) {
  return (
    <Routes>
      {" "}
      <Route
        path="/"
        exact
        element={
          <Home
            todos={props.todos}
            modalStatus={props.modalStatus}
            user={props.user}
            handleCheckboxChange={props.handleCheckboxChange}
          />
        }
      ></Route>
    </Routes>
  );
}
function UnAuthenticatedApp(props) {
  return (
    <Routes>
      <Route path="/" exact element={<Home todos={props.todos} />}></Route>
      <Route
        path="/Signup"
        exact
        element={<Signup updateUser={props.updateUser} />}
      ></Route>
    </Routes>
  );
}
export default (App);
