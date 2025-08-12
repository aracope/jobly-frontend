import React, { useContext } from "react";
import CurrentUserContext from "../context/CurrentUserContext";

function Home() {
  const { currentUser } = useContext(CurrentUserContext);

  if (currentUser) {
    return <h2>Welcome, {currentUser.firstName}!</h2>;
  } else {
    return <h2>Welcome to Jobly!</h2>;
  }
}

export default Home;
