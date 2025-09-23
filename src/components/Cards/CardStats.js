import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

export default function CardStats({
  statSubtitle,
  statTitle,
  statArrow,
  statPercent,
  statPercentColor,
  statDescripiton,
  statIconName,
  statIconColor,
  statsData,
  navigatePath,
  isLoading,
  hasError,
  validNumbers,
  onNumberClick,
  onItemClick,
  isClickable = false,
  showItemList = false,
}) {
  // Add these state variables in CardStats component
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [customNumber, setCustomNumber] = useState("");
  const dropdownRef = useRef(null);
  const history = useHistory();

  // Add the missing toggle function
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Add the missing number click handler
  // const handleNumberClick = (e) => {
  //    e.preventDefault();
  //   e.stopPropagation();

  //   if (onNumberClick && isClickable) {
  //     onNumberClick();
  //   }
  // };

  // Handle individual item click (for new functionality)
  // const handleItemClick = (item, e) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   console.log("Item clicked:", item);
  //   if (onItemClick && isClickable) {
  //     onItemClick(item.applicationNo || item.value);
  //   }
  // };

  // Original number click handler (for dropdown)
  const handleNumberClick = (item) => {
    if (navigatePath) {
      setShowDropdown(false);
      // Navigate to the path with the application number as a query parameter
      if (onItemClick && isClickable) {
        // Use the new functionality if available
        onItemClick(item.applicationNo || item.value);
      } else {
        // Fallback to original functionality
        history.push(`${navigatePath}?number=${item.value}`);
      }
    }
  };
  // Add the missing form submit handler
  const handleCustomNumberSubmit = async (e) => {
    e.preventDefault();
    if (customNumber.trim() && navigatePath) {
      // Check if the number exists in the valid numbers array
      if (
        validNumbers &&
        (validNumbers.includes(Number(customNumber)) ||
          validNumbers.includes(customNumber))
      ) {
        // Number is valid, navigate
        setShowDropdown(false);
        if (onItemClick && isClickable) {
          // Use new functionality
          onItemClick(customNumber);
        } else {
          // Fallback to original functionality
          history.push(`${navigatePath}?number=${customNumber}`);
        }
        setCustomNumber("");
        return;
      } else if (validNumbers) {
        // Number is not valid
        setValidationError("Application number not found in database");
        setTimeout(() => setValidationError(""), 3000);
        return;
      }
    }
    try {
      // Show loading indicator
      setIsValidating(true);

      // Validate if the number exists in the database
      const response = await fetch(
        `http://localhost:8081/api/application/validate?number=${customNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("user:admin123"),
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.exists) {
        // If the number exists, navigate to the path
        setShowDropdown(false);
        if (onItemClick && isClickable) {
          // Use new functionality
          onItemClick(customNumber);
        } else {
          // Fallback to original functionality
          history.push(`${navigatePath}?number=${customNumber}`);
        }
        setCustomNumber("");
      } else {
        // If the number doesn't exist, show an error
        setValidationError("Application number not found in database");
        setTimeout(() => setValidationError(""), 3000); // Clear error after 3 seconds
      }
    } catch (error) {
      console.error("Error validating application number:", error);
      setValidationError("Error validating application number");
      setTimeout(() => setValidationError(""), 3000); // Clear error after 3 seconds
    } finally {
      setIsValidating(false);
    }
  };
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const displayNumber = statTitle || (statsData ? statsData.length : 0);

  return (
    <>
      <div
        className="relative flex flex-col min-w-0 mb-6 break-words bg-white rounded shadow-lg xl:mb-0"
        onClick={() => {
          if (isClickable && onItemClick && !showItemList) {
            onItemClick();
          }
        }}
        style={{ cursor: isClickable && !showItemList ? "pointer" : "default" }}
      >
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative flex-1 flex-grow w-full max-w-full pr-4">
              <h5 className="text-xs font-bold uppercase text-blueGray-400">
                {statSubtitle}
              </h5>
            </div>
            <div
              className="relative flex-initial w-auto pl-4"
              ref={dropdownRef}
            >
              <div
                className={
                  "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full cursor-pointer " +
                  statIconColor
                }
                onClick={toggleDropdown}
              >
                <i className={statIconName}></i>
              </div>

              {/* Dropdown with loading states */}
              {showDropdown && (
                <div className="absolute mt-2 bg-white shadow-xl z-50 rounded-md border border-gray-200 right-0 p-2 min-w-[100px]">
                  {isLoading ? (
                    <div className="p-4 text-center">
                      <div className="w-6 h-6 mx-auto border-b-2 border-gray-900 rounded-full animate-spin"></div>
                      <p className="mt-2 text-sm text-gray-600">
                        Loading data...
                      </p>
                    </div>
                  ) : hasError ? (
                    <div className="p-4 text-center text-red-500">
                      <p>{hasError}</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-2 p-2">
                        {statsData.length > 0 ? (
                          statsData.map((item, index) => (
                            <div
                              key={index}
                              className={`text-center bg-gray-100 rounded p-2 ${
                                navigatePath
                                  ? "hover:bg-gray-200 cursor-pointer"
                                  : ""
                              }`}
                              onClick={() => handleNumberClick(item)}
                            >
                              <span className="text-lg font-semibold">
                                {" "}
                                {item.value}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-2 text-center">
                            <span className="text-gray-500">0</span>
                          </div>
                        )}
                      </div>

                      {/* Custom number input form */}
                      <div className="p-2 mt-2 border-t border-gray-200">
                        <form
                          onSubmit={handleCustomNumberSubmit}
                          className="flex items-center"
                        >
                          <input
                            type="text"
                            placeholder="Number"
                            className={`w-20 px-2 py-1 text-sm border rounded-l focus:outline-none focus:ring-1 ${
                              validationError
                                ? "border-red-500 focus:ring-red-500"
                                : "focus:ring-blue-500"
                            }`}
                            value={customNumber}
                            onChange={(e) => setCustomNumber(e.target.value)}
                            disabled={isValidating}
                          />
                          <button
                            type="submit"
                            className="px-2 py-1 text-sm text-white rounded-r"
                            style={{
                              backgroundColor: isValidating
                                ? "#999999"
                                : "#7c0000",
                            }}
                            disabled={!customNumber.trim() || isValidating}
                          >
                            {isValidating ? "..." : "Go"}
                          </button>
                        </form>
                        {/* Show validation error if present */}
                        {validationError && (
                          <div className="mt-2 text-xs text-red-500">
                            {validationError}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

CardStats.defaultProps = {
  statSubtitle: "Traffic",
  statIconName: "far fa-chart-bar",
  statIconColor: "bg-red-500",
  statsData: [],
  navigatePath: "",
  isLoading: false,
  hasError: null,
};

CardStats.propTypes = {
  statSubtitle: PropTypes.string,
  statIconName: PropTypes.string,
  statIconColor: PropTypes.string,
  statsData: PropTypes.array,
  navigatePath: PropTypes.string,
  isLoading: PropTypes.bool,
  hasError: PropTypes.string,
};
