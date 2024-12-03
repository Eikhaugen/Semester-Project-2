import { login } from "../../src/js/api/auth/login.js";
import { API_AUTH_LOGIN } from "../../src/js/api/constants.js";
import { headers } from "../../src/js/api/headers.js";
import { setKey } from "../../src/js/api/auth/key.js";

jest.mock("../../src/js/api/headers.js");
jest.mock("../../src/js/api/auth/key.js");
jest.mock("../../src/js/api/headers.js", () => ({
    headers: jest.fn(() => ({
      "Content-Type": "application/json",
      Authorization: "Bearer mock-api-key",
    })),
  }));
  beforeEach(() => {
    jest.spyOn(console, "warn").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  

global.fetch = jest.fn();

describe("login", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should send a POST request with the correct headers and body", async () => {
        const mockUserData = { email: "test@example.com", password: "password123" };
        const mockAccessToken = "mockAccessToken";
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({
                data: { accessToken: mockAccessToken },
            }),
        };

        headers.mockReturnValue({ "Content-Type": "application/json" });
        fetch.mockResolvedValue(mockResponse);

        await login(mockUserData);

        expect(headers).toHaveBeenCalled();
        expect(fetch).toHaveBeenCalledWith(API_AUTH_LOGIN, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mockUserData),
            redirect: "follow",
        });
        expect(mockResponse.json).toHaveBeenCalled();
        expect(setKey).toHaveBeenCalledWith(mockAccessToken);
    });

    it("should throw an error if the response is not ok", async () => {
        const mockUserData = { email: "test@example.com", password: "password123" };
        const mockErrorResponse = {
            ok: false,
            status: 401,
        };

        fetch.mockResolvedValue(mockErrorResponse);

        await expect(login(mockUserData)).rejects.toThrow("HTTP error! status: 401");

        expect(fetch).toHaveBeenCalledWith(API_AUTH_LOGIN, expect.any(Object));
        expect(setKey).not.toHaveBeenCalled();
    });

    it("should handle missing accessToken", async () => {
        const mockUserData = { email: "test@example.com", password: "password123" };
        const mockResponse = {
          ok: true,
          json: jest.fn().mockResolvedValue({ data: {} }),
        };
      
        headers.mockReturnValue({ "Content-Type": "application/json" });
        fetch.mockResolvedValue(mockResponse);
      
        const result = await login(mockUserData);
      
        expect(result).toEqual({});
        expect(console.warn).toHaveBeenCalledWith("No access token found in the response.");
        expect(setKey).not.toHaveBeenCalled();
      });      
});
