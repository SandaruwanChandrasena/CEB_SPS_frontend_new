// src/api/payloads.js

// Clean + normalize ApplicantDTO payload for backend
export function buildApplicantPayload(raw = {}) {
  const pick = (v) => (typeof v === "string" ? v.trim() : v ?? null);

  return {
    // Identity
    idType: pick(raw.idType) || "NIC",
    idNo: pick(raw.idNo),

    // Names
    firstName: pick(raw.firstName) || "",
    lastName: pick(raw.lastName) || "",
    fullName: pick(raw.fullName) || "",

    // Enums / flags
    personalCorporate: pick(raw.personalCorporate) || "Per", // "Per" | "Cop"
    cebEmployee: pick(raw.cebEmployee) || "y",                // "y" | "n"
    preferredLanguage: pick(raw.preferredLanguage) || "SN",   // "SN" | "EN"

    // Contacts
    mobileNo: pick(raw.mobileNo) || "",
    email: pick(raw.email) || "",
    telephoneNo: pick(raw.telephoneNo) || "",

    // Address
    streetAddress: pick(raw.streetAddress) || "",
    suburb: pick(raw.suburb) || "",
    city: pick(raw.city) || "",
    postalCode: pick(raw.postalCode) || "",

    // Job type if provided
    jobType: pick(raw.jobType),
  };
}
