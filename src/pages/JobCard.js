import React from "react";
import ApplyButton from "../components/ApplyButton";

function JobCard({ job }) {
  return (
    <div className="JobCard card mb-3 p-3">
      <h5>{job.title}</h5>
      <p>Salary: {job.salary ? `$${job.salary.toLocaleString()}` : "N/A"}</p>
      <p>Equity: {job.equity && job.equity !== "0" ? job.equity : "None"}</p>
      <ApplyButton jobId={job.id} />
    </div>
  );
}

export default JobCard;
