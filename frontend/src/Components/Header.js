import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


function Header(props) {
  return (
    <header className="bg-blue-200 p-5 mb-10">
      {props.isLoggedIn ? (
        <AuthHeader
          Signout={props.Signout}
        />
      ) : (
        <NonAuthHeader dispatch={props.dispatch} />
      )}
    </header>
  );
}

function NonAuthHeader(props) {
  console.log(props, "propssss");
  return (
    <div className="flex justify-end items-center mr-10">
      <Link
        exact="true"
        to="/"
        className="block font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400 hover:underline mr-5"
      >
        Home
      </Link>

      <Link
        exact="true"
        to="/signup"
        className="block font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400 hover:underline mr-10"
      >
        Register
      </Link>

      <button onClick={() => props.dispatch({type: "open"})} className="flex items-center px-5 py-2 text-sm font-medium tracking-wide text-center text-white capitalize transition-colors duration-200 transform bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
        Login
      </button>
    </div>
  );
}
function AuthHeader(props) {
  return (
    <div className="flex mr-10 justify-end items-center">
      <Link
        exact="true"
        to="/"
        className="block font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400 hover:underline mr-5"
      >
        Home
      </Link>

      <Link
        exact="true"
        to="/"
        className="block font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400 hover:underline"
        onClick={props.Signout}
      >
        Signout
      </Link>
    </div>
  );
}
function mapStateToProps(state) {
  return { isOpen: state.isOpen };
}
export default connect(mapStateToProps)(Header);
