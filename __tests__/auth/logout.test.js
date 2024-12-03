import { logout } from "../../src/js/ui/auth/logout.js";
import { clearKey } from "../../src/js/api/auth/key.js";

jest.mock("../../src/js/api/auth/key.js");

describe("logout", () => {
    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation(() => {});
        Object.defineProperty(window, "location", {
            writable: true,
            value: { href: "" },
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    it("should call clearKey and redirect to homepage", async () => {
        clearKey.mockResolvedValue();

        await logout();

        expect(clearKey).toHaveBeenCalledTimes(1);
        expect(window.location.href).toBe("/");
    });

    it("should log an error if clearKey fails", async () => {
        const error = new Error("Failed to clear key");
        clearKey.mockRejectedValueOnce(error);

        await expect(logout()).rejects.toThrow(error);

        expect(clearKey).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith("Failed to log out:", error);
    });
});


