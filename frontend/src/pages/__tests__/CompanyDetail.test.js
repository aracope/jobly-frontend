import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import CompanyDetail from "../CompanyDetail";
import JoblyApi from "../../api";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock("../../api");

const fakeCompany = {
  name: "Apple Inc.",
  logoUrl: "http://apple.img/logo.png",
  description: "Tech company",
  jobs: [
    { id: 1, title: "Software Engineer", salary: 120000 },
    { id: 2, title: "Product Manager", salary: 110000 },
  ],
};

test("renders company info and jobs", async () => {
  JoblyApi.getCompany.mockResolvedValue(fakeCompany);

  render(
    <MemoryRouter initialEntries={["/companies/apple"]}>
      <Routes>
        <Route path="/companies/:handle" element={<CompanyDetail />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/Loading company details/i)).toBeInTheDocument();

  await waitFor(() => expect(JoblyApi.getCompany).toHaveBeenCalledWith("apple"));

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Apple Inc.");
  expect(screen.getByAltText(/Apple Inc. logo/i)).toBeInTheDocument();
  expect(screen.getByText(/Tech company/i)).toBeInTheDocument();
  expect(screen.getByText(/Software Engineer/)).toBeInTheDocument();
  expect(screen.getByText(/\$120,000/)).toBeInTheDocument();
});
