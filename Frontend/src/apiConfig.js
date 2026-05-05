// src/apiConfig.js

/**
 * Centralized API configuration.
 * Automatically picks up the correct URL based on the environment:
 * - Local dev uses .env.local (http://localhost:5000)
 * - Vercel build uses .env.production (https://kevinex-backend.onrender.com)
 */

export const API_URL = import.meta.env.VITE_API_URL;


export default API_URL;
