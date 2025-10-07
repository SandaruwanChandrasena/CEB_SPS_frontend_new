// src/api/applicants.js
import { api } from "./client";

// GET /applicants/search?idNo=...
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
