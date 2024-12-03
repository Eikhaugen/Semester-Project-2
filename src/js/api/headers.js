const API_KEY = import.meta.env.VITE_API_KEY;

export function headers() {
  const headers = new Headers();

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  return headers;
}
