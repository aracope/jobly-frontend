
import React, { useState, useContext } from "react";
import CurrentUserContext from "../context/CurrentUserContext";
import JoblyApi from "../api";

function Profile() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const INITIAL_STATE = {
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    email: currentUser.email || "",
    username: currentUser.username || "",
    password: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  if (!currentUser) return <p>Loading...</p>;

  // Handle input changes
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({ ...f, [name]: value }));
    setFormErrors([]);
    setSaveConfirmed(false);
  }

  // Handle form submit
  async function handleSubmit(evt) {
    evt.preventDefault();

    // Prepare data to send: exclude username, include password if present
    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    try {
      const updatedUser = await JoblyApi.updateUser(currentUser.username, profileData);
      setCurrentUser(updatedUser);
      setFormErrors([]);
      setSaveConfirmed(true);
      setFormData(f => ({ ...f, password: "" })); // clear password field
    } catch (errors) {
      setFormErrors(errors);
      setSaveConfirmed(false);
    }
  }

  return (
    <div className="Profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username: {formData.username} (cannot be changed)
        </label>

        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Confirm password to save changes:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {formErrors.length
          ? formErrors.map((e, i) => <p key={i} style={{ color: "red" }}>{e}</p>)
          : null}

        {saveConfirmed && <p style={{ color: "green" }}>Profile updated successfully.</p>}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default Profile;
