import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";

/**
 * CompanyDetail Component
 * 
 * This component displays detailed information about a specific company.
 * It fetches the company data from the backend API using the company handle
 * obtained from the URL parameters. While loading data, it shows a loading
 * message. If the company is not found, it shows an appropriate message.
 * Otherwise, it renders the company name, logo, description, and a list
 * of jobs available at the company.
 * 
 * Responsibilities:
 * - Retrieve the company handle from URL parameters.
 * - Fetch company details asynchronously when the component mounts or when
 *   the handle changes.
 * - Handle loading and error states.
 * - Render company info and jobs.
 * 
 * Usage:
 * This component should be used within a Router context where the URL
 * includes a :handle parameter, e.g., /companies/:handle.
 */

function CompanyDetail() {
  // Extract the 'handle' parameter from the URL using React Router's useParams hook
  const { handle } = useParams();

  // State to hold the fetched company data. Initialized as null.
  const [company, setCompany] = useState(null);

  // State to track whether data is currently being fetched.
  const [isLoading, setIsLoading] = useState(true);

  /**
   * useEffect hook triggers the fetchCompany function whenever the
   * 'handle' changes (e.g., when navigating to a different company).
   * It encapsulates asynchronous data fetching logic.
   */
  useEffect(() => {
    async function fetchCompany() {
      setIsLoading(true); // Indicate loading state before the API call
      try {
        // Fetch company data from the API helper class using the company handle
        const companyRes = await JoblyApi.getCompany(handle);
        setCompany(companyRes); // Store the fetched data in state
      } catch (err) {
        // Log any errors encountered during fetch
        console.error(err);
      }
      setIsLoading(false); // Loading complete (success or failure)
    }

    fetchCompany();
  }, [handle]);

  // While loading data, render a simple loading message
  if (isLoading) return <p>Loading company details...</p>;

  // If loading is done but no company data was found, show "not found" message
  if (!company) return <p>Company not found</p>;

  // Render the company detail UI:
  // - Company name
  // - Company logo if available
  // - Description
  // - Jobs list or message if no jobs are available
  return (
    <div className="CompanyDetail container">
      <h1>{company.name}</h1>

      {/* Render company logo if logoUrl is present */}
      {company.logoUrl && (
        <img
          src={company.logoUrl}
          alt={`${company.name} logo`}
          style={{ height: "100px" }}
        />
      )}

      <p>{company.description}</p>

      <h3>Jobs at {company.name}</h3>

      {/* If no jobs, display a message */}
      {company.jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        // Otherwise, render a list of jobs with title and salary info
        <ul>
          {company.jobs.map((job) => (
            <li key={job.id}>
              {job.title} -{" "}
              {job.salary ? `$${job.salary.toLocaleString()}` : "Salary N/A"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CompanyDetail;
