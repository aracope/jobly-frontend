import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Login component
 * Props:
 * - login: async function from App that handles API call and token set.
 */
function Login({ login }) {
  const [formData, setFormData] = useState({
    username: "testuser", // dev default
    password: "password", // dev default
  });
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setErrors(null);
    const res = await login(formData);
    if (res.success) {
      // go home after login
      navigate("/");
    } else {
      setErrors(res.errors);
    }
  }

  return (
    <div className="Login container">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="form-control"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {errors && (
          <div className="alert alert-danger">{errors.join(", ")}</div>
        )}
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
