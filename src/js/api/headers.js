const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Generates headers for API requests.
 *
 * @returns {Headers} A Headers object with necessary API headers.
 */
export function headers() {
  const headers = new Headers();

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  headers.append("Content-Type", "application/json");

  return headers;
}
