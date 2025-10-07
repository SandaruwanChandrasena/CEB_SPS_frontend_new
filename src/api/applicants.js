// src/api/applicants.js
import { api } from "./client";

// GET /SPS/api/applicants/search?idNo=...
export async function fetchApplicantById(idNo) {
  try {
    const res = await api.get("/applicants/search", { params: { idNo } });
    return { ok: true, data: res.data };
  } catch (err) {
    return shapeError(err);
  }
}

// POST /SPS/api/applicants/save
export async function saveApplicant(payload) {
  try {
    const res = await api.post("/applicants/save", payload);
    return { ok: true, data: res.data };
  } catch (err) {
    return shapeError(err);
  }
}

// PATCH /SPS/api/applicants/{idNo}
export async function updateApplicant(idNo, payload) {
  try {
    const res = await api.patch(`/applicants/${encodeURIComponent(idNo)}`, payload);
    return { ok: true, data: res.data };
  } catch (err) {
    return shapeError(err);
  }
}

// Optional ping: GET /SPS/api/applicants/test
export async function pingApplicants() {
  try {
    const res = await api.get("/applicants/test");
    return { ok: true, data: res.data };
  } catch (err) {
    return shapeError(err);
  }
}

function shapeError(err) {
  const status = err?.response?.status;
  const data = err?.response?.data;
  const message = typeof data === "string" ? data : data?.message || err.message || "Request failed";
  return { ok: false, status, message, data };
}
