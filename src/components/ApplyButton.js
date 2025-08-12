import React, { useState, useContext } from "react";
import CurrentUserContext from "../context/CurrentUserContext";
import JoblyApi from "../api";

function ApplyButton({ jobId }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const hasAppliedInitially = currentUser?.applications?.includes(jobId) || false;
  const [hasApplied, setHasApplied] = useState(hasAppliedInitially);
  const [loading, setLoading] = useState(false);

  async function handleApply(evt) {
    evt.preventDefault();

    if (!currentUser) {
      alert("Please log in to apply for jobs.");
      return;
    }

    setLoading(true);

    try {
      await JoblyApi.applyToJob(currentUser.username, jobId);
      setCurrentUser(cu => ({
        ...cu,
        applications: [...(cu.applications || []), jobId],
      }));
      setHasApplied(true);
    } catch (err) {
      console.error("Failed to apply:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleApply}
      disabled={!currentUser || hasApplied || loading}
      aria-label={hasApplied ? "Already applied" : "Apply for job"}
    >
      {hasApplied
        ? "Applied"
        : loading
        ? "Applying..."
        : currentUser
        ? "Apply"
        : "Login to apply"}
    </button>
  );
}

export default ApplyButton;
