import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup({ signup }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
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
    const res = await signup(formData);
    if (res.success) {
      navigate("/");
    } else {
      setErrors(res.errors);
    }
  }

  return (
    <div className="Signup container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors && (
          <div className="alert alert-danger">{errors.join(", ")}</div>
        )}
        <button className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
