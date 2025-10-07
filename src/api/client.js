// src/api/client.js
import axios from "axios";

const BASE = process.env.REACT_APP_API_BASE_URL || ""; // e.g. http://127.0.0.1:8088/SPS

function join(base, path) {
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

export const API_BASE_URL = join(BASE, "/api");

export const api = axios.create({
  baseURL: API_BASE_URL, // -> http://127.0.0.1:8088/SPS/api
  headers: { "Content-Type": "application/json" },
});
