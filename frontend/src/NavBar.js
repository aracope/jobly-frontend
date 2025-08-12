import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import CurrentUserContext from "./context/CurrentUserContext";

function NavBar({ logout }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div className="container">
        <NavLink className="navbar-brand" to="/">Jobly</NavLink>
        <div className="navbar-nav">
          <NavLink className="nav-link" to="/companies">Companies</NavLink>
          <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
        </div>

        <div className="navbar-nav ms-auto">
          {currentUser ? (
            <>
              <span className="nav-link">Hello, {currentUser.username}</span>
              <NavLink className="nav-link" to="/profile">Profile</NavLink>
              <button className="btn btn-outline-secondary" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink className="nav-link" to="/login">Login</NavLink>
              <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
