// src/api/client.js
import axios from "axios";

const BASE = (process.env.REACT_APP_API_BASE_URL || "/SPS").trim();
const join = (a, b) => `${a.replace(/\/+$/, "")}/${b.replace(/^\/+/, "")}`;
export const API_BASE_URL = join(BASE, "/api"); // -> "/SPS/api"

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach Basic auth (from .env)
const BASIC_USER = process.env.REACT_APP_API_BASIC_USER;
const BASIC_PASS = process.env.REACT_APP_API_BASIC_PASS;
if (BASIC_USER && BASIC_PASS) {
  const token = btoa(`${BASIC_USER}:${BASIC_PASS}`);
  api.defaults.headers.common.Authorization = `Basic ${token}`;
}

// Debug logging
if (typeof window !== "undefined") {
  console.log("[API] baseURL:", API_BASE_URL);
}

api.interceptors.request.use((config) => {
  try {
    const body =
      typeof config.data === "object" ? JSON.stringify(config.data) : config.data;
    console.log(
      "[API REQ]",
      config.method?.toUpperCase(),
      (config.baseURL || "") + (config.url || ""),
      "body:",
      body
    );
  } catch {}
  return config;
});

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
