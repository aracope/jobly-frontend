import React, { useState, useContext } from "react";
import CurrentUserContext from "../context/CurrentUserContext";
import JoblyApi from "../api";

function ApplyButton({ jobId }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [hasApplied, setHasApplied] = useState(
    currentUser.applications?.includes(jobId) || false
  );
  const [loading, setLoading] = useState(false);

  async function handleApply(evt) {
    evt.preventDefault();
    setLoading(true);

    try {
      await JoblyApi.applyToJob(currentUser.username, jobId);
      // Update context with new application
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
      disabled={hasApplied || loading}
      aria-label={hasApplied ? "Already applied" : "Apply for job"}
    >
      {hasApplied ? "Applied" : loading ? "Applying..." : "Apply"}
    </button>
  );
}

export default ApplyButton;
