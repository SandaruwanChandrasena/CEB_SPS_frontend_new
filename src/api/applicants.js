// src/api/applicants.js
import { api } from "./client";

// GET /api/applicants/search?idNo=...
export async function fetchApplicantById(idNo) {
  try {
    const res = await api.get("/applicants/search", { params: { idNo } });
    return { ok: true, data: res.data };
  } catch (err) {
    if (err.response?.status === 404) {
      return { ok: false, notFound: true, message: err.response.data || "Not found" };
    }
    return { ok: false, message: err.response?.data || err.message || "Request failed" };
  }
}

export async function saveApplicant(payload) {
  const res = await api.post("/applicants/save", payload);
  return res.data;
}

export async function updateApplicant(idNo, payload) {
  const res = await api.patch(`/applicants/${idNo}`, payload);
  return res.data;
}
