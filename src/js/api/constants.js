export const API_BASE = "https://v2.api.noroff.dev";

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

// Auction House Endpoints
export const API_AUCTION = `${API_BASE}/auction`;

// Listings Endpoints
export const API_AUCTION_LISTINGS = `${API_AUCTION}/listings`;
export const API_AUCTION_LISTINGS_BY_ID = (id) => `${API_AUCTION_LISTINGS}/${id}`;
export const API_AUCTION_CREATE_LISTING = API_AUCTION_LISTINGS;
export const API_AUCTION_BID_ON_LISTING = (id) => `${API_AUCTION_LISTINGS}/${id}/bids`;

// Profiles Endpoints
export const API_AUCTION_PROFILES = `${API_AUCTION}/profiles`;
export const API_AUCTION_PROFILE_BY_NAME = (name) => `${API_AUCTION_PROFILES}/${name}`;
export const API_AUCTION_PROFILE_LISTINGS = (name) => `${API_AUCTION_PROFILES}/${name}/listings`;
export const API_AUCTION_PROFILE_BIDS = (name) => `${API_AUCTION_PROFILES}/${name}/bids`;
export const API_AUCTION_PROFILE_WINS = (name) => `${API_AUCTION_PROFILES}/${name}/wins`;

// Search Endpoints
export const API_AUCTION_SEARCH_LISTINGS = (query) => `${API_AUCTION_LISTINGS}/search?q=${query}`;
export const API_AUCTION_SEARCH_PROFILES = (query) => `${API_AUCTION_PROFILES}/search?q=${query}`;

