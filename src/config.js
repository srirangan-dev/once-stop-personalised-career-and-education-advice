// src/config.js

// Main backend API URL (set in Vercel as VITE_API_URL)
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Optional: other environment variables for frontend
// These must start with VITE_ to be accessible in React (Vite)
export const FRONTEND_NAME = import.meta.env.VITE_FRONTEND_NAME || "PathFinder";
export const FRONTEND_VERSION = import.meta.env.VITE_FRONTEND_VERSION || "1.0.0";

// Example usage of headers or constants
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};