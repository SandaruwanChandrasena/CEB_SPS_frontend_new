// src/api/client.js
import axios from "axios";

// ----- Base URL (/SPS/api by default) -----
const BASE = (process.env.REACT_APP_API_BASE_URL || "/SPS").trim();
const join = (a, b) => `${a.replace(/\/+$/, "")}/${b.replace(/^\/+/, "")}`;
export const API_BASE_URL = join(BASE, "/api");

// ----- Basic Auth from .env -----
const BASIC_USER = process.env.REACT_APP_API_BASIC_USER || "";
const BASIC_PASS = process.env.REACT_APP_API_BASIC_PASS || "";
const AUTH_HEADER =
  BASIC_USER && BASIC_PASS
    ? "Basic " + btoa(`${BASIC_USER}:${BASIC_PASS}`)
    : null;

// ----- Axios instance -----
export const api = axios.create({
  baseURL: API_BASE_URL,
  // 1) Set axios' built-in basic auth (some proxies keep this even if headers are changed)
  auth:
    BASIC_USER && BASIC_PASS
      ? { username: BASIC_USER, password: BASIC_PASS }
      : undefined,
  // 2) Also set explicit Authorization header (belt & suspenders)
  headers: {
    "Content-Type": "application/json",
    ...(AUTH_HEADER ? { Authorization: AUTH_HEADER } : {}),
    "X-Requested-With": "XMLHttpRequest", // reduces Basic Auth browser challenge
  },
  withCredentials: true, // if your server sets cookies (safe to keep on)
});

// ----- Always re-attach Authorization on every request -----
api.interceptors.request.use((config) => {
  if (AUTH_HEADER) config.headers.Authorization = AUTH_HEADER;
  try {
    const body =
      typeof config.data === "object"
        ? JSON.stringify(config.data)
        : config.data;
    console.log(
      "[API REQ]",
      (config.method || "GET").toUpperCase(),
      (config.baseURL || "") + (config.url || ""),
      "body:",
      body
    );
  } catch {}
  return config;
});

// ----- Log errors nicely -----
api.interceptors.response.use(
  (r) => r,
  (error) => {
    const status = error?.response?.status;
    const data = error?.response?.data;
    const url = (error?.config?.baseURL || "") + (error?.config?.url || "");
    console.error("[API ERROR]", status, url, data || error.message);
    throw error;
  }
);

// Debug
if (typeof window !== "undefined") {
  console.log("[API] baseURL:", API_BASE_URL);
  if (AUTH_HEADER) console.log("[API] Basic Auth attached ✅");
  else console.warn("[API] ⚠️ No Basic Auth set (check .env)");
}
