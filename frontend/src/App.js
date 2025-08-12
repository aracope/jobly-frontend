import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, MemoryRouter } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import JoblyApi from "./api";
import useLocalStorage from "./hooks/useLocalStorage";
import CurrentUserContext from "./context/CurrentUserContext";

import NavBar from "./NavBar";
import Home from "./pages/Home";
import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

/**
 * App:
 * - keeps token in localStorage (via useLocalStorage)
 * - sets JoblyApi.token whenever token changes
 * - loads currentUser from API when token present
 * - provides login/signup/logout functions to children
 */

function App() {
  const [token, setToken] = useLocalStorage("jobly-token", null);
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const navigate = useNavigate();

  // When token changes, set it on the API and (re)load current user
  useEffect(() => {
    async function loadUser() {
      if (token) {
        try {
          // Set token for API helper
          JoblyApi.token = token;

          // decode to get username
          const { username } = jwtDecode(token);

          // request user from backend
          const user = await JoblyApi.getCurrentUser(username);
          setCurrentUser(user);
        } catch (err) {
          console.error("Failed to load user", err);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
        JoblyApi.token = null;
      }
      setInfoLoaded(true);
    }

    // reset loading flag while we fetch
    setInfoLoaded(false);
    loadUser();
  }, [token]);

  /** Login: call API to get token, store token (localStorage + state) */
  async function login(credentials) {
    // credentials = { username, password }
    try {
      const token = await JoblyApi.login(credentials);
      setToken(token); // triggers effect to load user
      return { success: true };
    } catch (err) {
      // return errors to form
      return { success: false, errors: err };
    }
  }

  /** Signup: call API to register and receive token */
  async function signup(data) {
    try {
      const token = await JoblyApi.signup(data);
      setToken(token);
      return { success: true };
    } catch (err) {
      return { success: false, errors: err };
    }
  }

  /** Logout: clear token and currentUser */
  function logout() {
    setCurrentUser(null);
    setToken(null); // removes from localStorage via hook
    JoblyApi.token = null;
    navigate("/"); // return to homepage
  }

  // avoid rendering routes until we check localStorage token (prevents flicker)
  if (!infoLoaded) return <div>Loading...</div>;
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <NavBar currentUser={currentUser} logout={logout} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:handle" element={<CompanyDetail />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/signup" element={<Signup signup={signup} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
