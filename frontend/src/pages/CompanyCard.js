import React from "react";
import { Link } from "react-router-dom";

function CompanyCard({ company }) {
  return (
    <Link
      to={`/companies/${company.handle}`}
      className="CompanyCard"
      style={{
        display: "block",
        border: "1px solid #ccc",
        padding: "1rem",
        margin: "1rem 0",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <h3>{company.name}</h3>
      {company.logoUrl && (
        <img
          src={company.logoUrl}
          alt={`${company.name} logo`}
          style={{ height: "50px" }}
        />
      )}
      <p>{company.description}</p>
    </Link>
  );
}

export default CompanyCard;
