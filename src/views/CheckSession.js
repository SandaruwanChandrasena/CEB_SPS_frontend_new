// import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

// const SessionCheck = () => {
//   const history = useHistory();
//   const [sessionExpired, setSessionExpired] = useState(false);

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8088/SPSProjectBackend-0.0.1-SNAPSHOT/api/v1/session", {
//           method: "GET",
//           credentials: "include",
//         });

//         if (response.status === 401 && !sessionExpired) {
//           setSessionExpired(true);
//           alert("Session expired! Please log in again.");
//           sessionStorage.clear(); // Clear stored session
//           history.push("/auth/login");
//         }
//       } catch (error) {
//         console.error("Session check failed:", error);
//       }
//     };

//     // Check session every 30 seconds
//     const interval = setInterval(checkSession, 30000);

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, [history, sessionExpired]);

//   return null;
// };

// export default SessionCheck;


import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify"; 

const SessionCheck = () => {
  const history = useHistory();
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const checkSession = () => {
      const userId = sessionStorage.getItem("userId");
      const userLevel = sessionStorage.getItem("userLevel");
      const deptId = sessionStorage.getItem("deptId");
      const sessionStart = sessionStorage.getItem("sessionStart");

      console.log("Session Check:", { userId, userLevel, deptId });

      const currentTime = Date.now();
      const tenMinutes = 10 * 60 * 1000; // 600,000 ms

      // If any session data is missing or the session has expired
      if (
        !userId ||
        !userLevel ||
        !deptId ||
        !sessionStart ||
        currentTime - Number(sessionStart) > tenMinutes
      ) {
        // Avoid setting session expired multiple times
        if (!sessionExpired) {
          setSessionExpired(true);
          toast.error("Session expired or invalid! Please log in again.");
          sessionStorage.clear();
          history.push("/auth/login");
        }
      } else {
        // Log the session details if the session is still valid
        console.log("Session is still valid.");
      }
    };

    // Set interval to check session every 30 seconds
    const interval = setInterval(checkSession, 8000000);
    
    // Clean up the interval when the component unmounts
    return () => clearInterval(interval); 

  }, [history, sessionExpired]);

  return null;
};

export default SessionCheck;