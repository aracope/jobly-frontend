import React, { useEffect, useState } from "react";
import JoblyApi from "../api";
import JobCard from "./JobCard";

/**
 * Jobs Component
 *
 * Fetches and displays a list of jobs.
 * Shows a loading state while fetching jobs.
 * Uses JobCard component to render individual jobs.
 */

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true);
      try {
        const jobsRes = await JoblyApi.getJobs();
        setJobs(jobsRes);
      } catch (err) {
        console.error("Failed to load jobs", err);
      }
      setIsLoading(false);
    }
    fetchJobs();
  }, []);

  if (isLoading) return <p>Loading jobs...</p>;

  if (!jobs.length) return <p>No jobs found.</p>;

  return (
    <div className="Jobs container">
      <h1>Jobs</h1>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
        
      ))}
    </div>
  );
}

export default Jobs;
