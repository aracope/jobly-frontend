import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Companies from "../Companies";
import JoblyApi from "../../api";

// Mock the API
jest.mock("../../api");

const mockCompanies = [
  { handle: "apple", name: "Apple", description: "Tech giant", logoUrl: null },
  { handle: "google", name: "Google", description: "Search engine", logoUrl: null },
];

describe("Companies component", () => {
  test("renders list of companies on load", async () => {
    JoblyApi.getCompanies.mockResolvedValue(mockCompanies);

    render(
      <MemoryRouter>
        <Companies />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading companies/i)).toBeInTheDocument();

    // Wait for companies to appear
    expect(await screen.findByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Google")).toBeInTheDocument();
  });

  test("filters companies on search", async () => {
    JoblyApi.getCompanies
      .mockResolvedValueOnce(mockCompanies) // initial load
      .mockResolvedValueOnce([mockCompanies[0]]); // search result

    render(
      <MemoryRouter>
        <Companies />
      </MemoryRouter>
    );

    // Wait for initial list
    await screen.findByText("Apple");

    fireEvent.change(screen.getByPlaceholderText(/search by name/i), {
      target: { value: "Apple" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText("Apple")).toBeInTheDocument();
      expect(screen.queryByText("Google")).not.toBeInTheDocument();
    });
  });
});
