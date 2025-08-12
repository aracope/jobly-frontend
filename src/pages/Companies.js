import React, { useEffect, useState } from "react";
import JoblyApi from "../api";
import CompanyCard from "./CompanyCard";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load all companies on mount
  useEffect(() => {
    searchCompanies();
  }, []);

  /** Call backend to search companies by name (or get all if no term) */
  async function searchCompanies(name) {
    setIsLoading(true);
    try {
      const results = await JoblyApi.getCompanies(name);
      setCompanies(results);
    } catch (err) {
      console.error("Error loading companies:", err);
    }
    setIsLoading(false);
  }

  /** Handle form submit for search */
  function handleSubmit(evt) {
    evt.preventDefault();
    searchCompanies(searchTerm.trim() || undefined);
  }

  if (isLoading) return <p>Loading companies...</p>;

  return (
    <div className="Companies container">
      <h1>Companies</h1>

      {/* Search form */}
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(evt) => setSearchTerm(evt.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {companies.length === 0 ? (
        <p>No companies found.</p>
      ) : (
        <div>
          {companies.map((c) => (
            <CompanyCard key={c.handle} company={c} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Companies;
