import fetch from "node-fetch";

interface NominatimResponse {
  display_name?: string;
  address?: Record<string, unknown>;
}

export const reverseGeocode = async (
  lat: number,
  lng: number
): Promise<string | null> => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "User-Agent": "reverse-geocoder-lite/1.0.0 (ashitacreatives@gmail.com)",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch address from coordinates.");
    }

    const data = (await response.json()) as NominatimResponse;

    if (data && data.address) {
      return data.display_name ?? null;
    } else {
      throw new Error("No address found for the provided coordinates.");
    }
  } catch (error: any) {
    console.error("Error during reverse geocoding:", error.message);
    return null;
  }
};
