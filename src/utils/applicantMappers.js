// Map backend ApplicantDTO -> shapes used by your form tabs

export function mapApplicantToPersonal(app) {
  return {
    idType: app.idType || "",
    idNo: app.idNo || "",
    fname: app.firstName || "",
    lname: app.lastName || "",
    streetAddress: app.streetAddress || "",
    suburb: app.suburb || "",
    city: app.city || "",
    postalCode: app.postalCode || "",
    telephoneNo: app.telephoneNo || "",
    mobileNo: app.mobileNo || "",
    email: app.email || "",
    preferredLanguage: app.preferredLanguage || "",
    cebEmployee: app.cebEmployee == null ? "" : String(app.cebEmployee).trim(),
  };
}

export function mapApplicantToLocational(app) {
  return {
    streetAddress: app.streetAddress || "",
    suburb: app.suburb || "",
    city: app.city || "",
    postalCode: app.postalCode || "",
  };
}

// Most application-tab values are user entries; keep minimal defaults
export function mapApplicantToApplication(_app) {
  return {
    applicationId: "",
    deptId: "",
    submitDate: "",       // yyyy-mm-dd
    applicationType: "BS",
    preparedBy: "WEB",
    status: "N",
    description: "",
    durationType: "",
    duration: "",
    isLoanApp: "N",
    jobName: "",
  };
}

export function mapApplicantToTech(_app) {
  return {};
}
