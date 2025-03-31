import { reverseGeocode } from "../index";

// Import fetch and mock it properly
import fetch from "node-fetch";
jest.mock("node-fetch", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("reverseGeocode", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns the address when coordinates are valid", async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        display_name: "Eiffel Tower, Paris, France",
        address: { city: "Paris" },
      }),
    } as any);

    const result = await reverseGeocode(0.31598, 32.53910);
    expect(result).toBe("Eiffel Tower, Paris, France");
  });

  it("returns null if no address is found", async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as any);

    const result = await reverseGeocode(0, 0);
    expect(result).toBeNull();
  });

  it("returns null if fetch fails", async () => {
    mockedFetch.mockRejectedValueOnce(new Error("Network error"));

    const result = await reverseGeocode(0.31598, 32.53910);
    expect(result).toBeNull();
  });

  it("returns null if response is not ok", async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    } as any);

    const result = await reverseGeocode(0.31598, 32.53910);
    expect(result).toBeNull();
  });
});
