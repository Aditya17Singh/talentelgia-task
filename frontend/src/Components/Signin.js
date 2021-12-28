import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { connect } from "react-redux";

function Signin(props) {
  let [state, setState] = useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  function validatePassword(password) {
    let passwordError;
    if (password.length < 7) {
      passwordError = "Password can't be less than 6 characters";
    }
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;
    if (!re.test(password)) {
      passwordError = "Password must contain a character and a Number";
    }
    return passwordError;
  }

  function handleInput({ target }) {
    let { name, value } = target;
    let errors = state.errors;
    switch (name) {
      case "email":
        errors.email = validateEmail(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password = validatePassword(value);
        break;
      default:
        break;
    }
    setState({ ...state, errors, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = state;
    // Default options are marked with *
    fetch("http://localhost:5050/api/users/login", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        } else {
          return res.json();
        }
      })
      .then(({ user }) => {
        console.log(user);
        props.updateUser(user);
        navigate("/");
      })
      .catch((errors) => {
        console.log(errors, "Err");
        setState((prevState) => {
          return {
            ...prevState,
            errors: {
              ...prevState.errors,
              email: "Email or Password is incorrect!",
            },
          };
        });
      });
  }

  let { email, password } = state.errors;
  return (
    <>
      <section className=" flex flex-col justify-center">
        <div className="p-10 xs:p-0 mx-auto relative">
          <div className="shadow w-96  rounded-lg divide-y bg-gray-100 divide-gray-200 absolute right-0.6 bottom-0.6" style={{left: "-8rem" ,bottom: "-10.5rem"}}>
            <button onClick={() => props.dispatch({ type: "close" })}>
              Close
            </button>
            <form className="px-7 py-7">
              <h2 className="font-bold text-center text-2xl mb-5">Sign In</h2>
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                E-mail
              </label>
              <input
                value={state.email}
                onChange={handleInput}
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <span className="text-red-500 block my-2">{email}</span>
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Password
              </label>
              <input
                value={state.password}
                onChange={handleInput}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <span className="text-red-500 block my-2">{password}</span>
              <button
                type="button"
                className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                onClick={handleSubmit}
              >
                <span className="inline-block mr-2">Login</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </form>
            {state.isLoggedIn ? <p>user loggedin</p> : ""}
          </div>
        </div>
      </section>
    </>
  );
}
function mapStateToProps(state) {
  return { isOpen: state.isOpen };
}
export default connect(mapStateToProps)(Signin);
