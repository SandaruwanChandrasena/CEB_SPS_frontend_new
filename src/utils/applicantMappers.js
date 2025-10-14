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

/**
 * Most of your Application tab fields don't exist on APPLICANT.
 * Keep them blank or set lightweight defaults if you want.
 */
export function mapApplicantToApplication(app) {
  return {
    applicationId: "",  // stays user-entered
    description: "",    // e.g. `New app for ${app.firstName} ${app.lastName}`
    jobName: "",        // not in APPLICANT
  };
}

// Tech tab has no direct mapping from APPLICANT in your schema today.
export function mapApplicantToTech(app) {
  return {};
}
