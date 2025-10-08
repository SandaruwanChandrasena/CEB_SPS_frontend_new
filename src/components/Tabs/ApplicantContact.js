import { useState } from "react";

const phoneRegex =
  /^\+?([1-9]{1,3})?[-.\s]?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})(?:\s*x(\d+))?$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ApplicantContact = ({ appData = {}, onInputChange, setAppData, errors = {} }) => {
  const [localErrors, setLocalErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const patch = { [name]: value };
    onInputChange?.(patch);
    setAppData?.((prev) => ({ ...(prev || {}), ...patch }));

    setLocalErrors((prev) => {
      const next = { ...prev };
      if (name === "mobileNo")
        next.mobileNo = phoneRegex.test(value.trim()) ? "" : "Invalid phone number format";
      if (name === "email")
        next.email = emailRegex.test(value.trim()) ? "" : "Invalid email format";
      return next;
    });
  };

  const base =
    "border-1 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 hover:border-yellow-400";

  const errorBorder = (name) => (errors[name] || localErrors[name] ? "border-red-500" : "");
  const errMsg = (name) => {
    const msg = errors[name] || localErrors[name];
    return msg ? <p className="mt-1 text-xs text-red-600">{msg}</p> : null;
  };

  const editableHint = "You can edit this field.";

  return (
    <div className="flex-auto px-4 py-10 pt-1 lg:px-10">
      <form>
        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-blueGray-600">Mobile Number</label>
              <input
                type="text"
                name="mobileNo"
                value={appData.mobileNo || ""}
                onChange={handleChange}
                className={`${base} ${errorBorder("mobileNo")}`}
                placeholder="Enter your mobile number"
                style={{ border: "1px solid #ccc" }}
                title={editableHint}
              />
              {errMsg("mobileNo")}
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-blueGray-600">Email Address</label>
              <input
                type="email"
                name="email"
                value={appData.email || ""}
                onChange={handleChange}
                className={`${base} ${errorBorder("email")}`}
                placeholder="Enter your email"
                style={{ border: "1px solid #ccc" }}
                title={editableHint}
              />
              {errMsg("email")}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-blueGray-600">Land</label>
              <input
                type="text"
                name="telephoneNo"
                value={appData.telephoneNo || ""}
                onChange={handleChange}
                className={`${base} ${errorBorder("telephoneNo")}`}
                placeholder="Enter your Land number"
                style={{ border: "1px solid #ccc" }}
                title={editableHint}
              />
              {errMsg("telephoneNo")}
            </div>
          </div>

          <div className="w-full px-4 lg:w-6/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-blueGray-600">
                Street Address <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="streetAddress"
                value={appData.streetAddress || ""}
                onChange={handleChange}
                className={`${base} ${errorBorder("streetAddress")}`}
                style={{ border: "1px solid #ccc" }}
                title={editableHint}
              />
              {errMsg("streetAddress")}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-4/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-blueGray-600">
                Suburb <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="suburb"
                value={appData.suburb || ""}
                onChange={handleChange}
                className={`${base} ${errorBorder("suburb")}`}
                style={{ border: "1px solid #ccc" }}
                title={editableHint}
              />
              {errMsg("suburb")}
            </div>
          </div>

          <div className="w-full px-4 lg:w-4/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-blueGray-600">
                City <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="city"
                value={appData.city || ""}
                onChange={handleChange}
                className={`${base} ${errorBorder("city")}`}
                style={{ border: "1px solid #ccc" }}
                title={editableHint}
              />
              {errMsg("city")}
            </div>
          </div>

          <div className="w-full px-4 lg:w-4/12">
            <div className="relative w-full mb-3">
              <label className="block mb-2 text-md text-blueGray-600">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={appData.postalCode || ""}
                onChange={handleChange}
                className={`${base} ${errorBorder("postalCode")}`}
                style={{ border: "1px solid #ccc" }}
                title={editableHint}
              />
              {errMsg("postalCode")}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplicantContact;
