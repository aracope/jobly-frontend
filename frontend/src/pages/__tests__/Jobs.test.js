import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Jobs from "../Jobs";
import JoblyApi from "../../api";

jest.mock("../../api");

const fakeJobs = [
  { id: 1, title: "DevOps Engineer", salary: 95000, equity: "0.05" },
  { id: 2, title: "QA Analyst", salary: null, equity: "0" },
];

test("renders jobs list with JobCard components", async () => {
  JoblyApi.getJobs.mockResolvedValue(fakeJobs);

  render(<Jobs />);

  expect(screen.getByText(/Loading jobs/i)).toBeInTheDocument();

  await waitFor(() => expect(JoblyApi.getJobs).toHaveBeenCalled());

  expect(screen.getByText("DevOps Engineer")).toBeInTheDocument();
  expect(screen.getByText("Salary: $95,000")).toBeInTheDocument();
  expect(screen.getByText("Equity: 0.05")).toBeInTheDocument();

  expect(screen.getByText("QA Analyst")).toBeInTheDocument();
  expect(screen.getByText("Salary: N/A")).toBeInTheDocument();
  expect(screen.getByText("Equity: None")).toBeInTheDocument();
});
