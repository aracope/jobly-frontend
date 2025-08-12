import JoblyApi from "./api";
import axios from "axios";

jest.mock("axios");

describe("JoblyApi", () => {
  beforeEach(() => {
    JoblyApi.token = "fake-token";
  });

  test("getCompany calls API and returns company data", async () => {
    const companyData = { company: { handle: "apple", name: "Apple Inc." } };
    axios.mockResolvedValue({ data: companyData });

    const res = await JoblyApi.getCompany("apple");
    expect(axios).toHaveBeenCalledWith(expect.objectContaining({
      url: expect.stringContaining("companies/apple"),
      method: "get",
      headers: expect.objectContaining({ Authorization: expect.stringContaining("Bearer") }),
    }));
    expect(res).toEqual(companyData.company);
  });

  test("getCompanies calls API and returns companies array", async () => {
    const companiesData = { companies: [{ handle: "apple" }, { handle: "google" }] };
    axios.mockResolvedValue({ data: companiesData });

    const res = await JoblyApi.getCompanies();
    expect(res).toEqual(companiesData.companies);
  });
});
