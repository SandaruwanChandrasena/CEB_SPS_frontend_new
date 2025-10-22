// src/utils/applicantMappers.js
export const mapApplicantToPersonal = (a = {}) => ({
  idType: a.idType || "",
  idNo: a.idNo || "",
  fname: a.firstName || "",
  lname: a.lastName || "",
  streetAddress: a.streetAddress || "",
  suburb: a.suburb || "",
  city: a.city || "",
  postalCode: a.postalCode || "",
  telephoneNo: a.telephoneNo || "",
  mobileNo: a.mobileNo || "",
  email: a.email || "",
  preferredLanguage: a.preferredLanguage || "",
  cebEmployee: a.cebEmployee == null ? "" : String(a.cebEmployee).trim(),
});

export const mapApplicantToLocational = (a = {}) => ({
  streetAddress: a.streetAddress || "",
  suburb: a.suburb || "",
  city: a.city || "",
  postalCode: a.postalCode || "",
});

export const mapApplicantToApplication = (a = {}) => ({
  idNo: a.idNo || "",
  preparedBy: "WEB",
  status: "N",
});

export const mapApplicantToTech = (_a = {}) => ({});
