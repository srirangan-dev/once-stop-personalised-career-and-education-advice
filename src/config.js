// src/config.js

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export const FRONTEND_NAME = import.meta.env.VITE_FRONTEND_NAME || "PathFinder";
export const FRONTEND_VERSION = import.meta.env.VITE_FRONTEND_VERSION || "1.0.0";
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};