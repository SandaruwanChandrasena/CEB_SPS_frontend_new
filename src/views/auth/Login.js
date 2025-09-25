import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ceb from "../../img/ceb.png"
import { toast } from "react-toastify";

export default function Login() {
  const [userId, setuserId] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    //history.push("/jobtypeset");
    e.preventDefault();
    try {

      const response = await fetch(`${baseUrl}/api/v1/auth/login`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("user:admin123"),
        },
        body: JSON.stringify({ userId, password }),
        credentials: "include",
      });
      // const data = await response.json();
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      if (response.ok) {
        // Store in sessionStorage
        sessionStorage.setItem("userId", data.userId);
        sessionStorage.setItem("userLevel", data.userLevel);
        // sessionStorage.setItem("eAccountNo", data.eAccountNo);
        sessionStorage.setItem("deptId", data.costcenter);
        sessionStorage.setItem("userName", data.userName);	
        sessionStorage.setItem("sessionStart", Date.now().toString());
  
        const userlevel = data.userLevel;
  
        console.log("Session storage saved:", {
          userId: sessionStorage.getItem("userId"),
          userLevel: sessionStorage.getItem("userLevel"),
          deptId: sessionStorage.getItem("deptId"),
          userName: sessionStorage.getItem("userName"),
          sessionStart: sessionStorage.getItem("sessionStart"),
        });

        if (userlevel === "CE") {
          history.push("/admin/dashboardCE");
        } else if (userlevel === "EE") {
          history.push("/admin/dashboardEE");
        } else {
          history.push("/jobtypeset"); // Default page
        }
        toast.success("Login successfully!");
        console.log("Login successful", data);
      } else {
        // Handle login error
        toast.error(
          "If you have not account, register first. If you registered verify your email address. Otherwise check your email address and password"
        );
        console.error("Login failed", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div className="container h-full px-4 mx-auto">
        <div className="flex items-center content-center justify-center h-full">
          <div className="w-full px-4 lg:w-4/12">
            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border-0 rounded-lg shadow-lg bg-blueGray-200">
              <div className="flex items-center justify-center">
                <img
                  alt="ceb logo"
                  className="w-20 h-20 mt-8"
                  src={ceb}
                />
              </div>
              <div className="flex-auto px-4 py-10 pt-0 mt-2 lg:px-10">
                <div className="text-sm text-center text-blueGray-400">
                  Sign In With Credentials
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-sm text-blueGray-600"
                      htmlFor="grid-password"
                    >

                      User Name
                    </label>
                    <input
                      type="text"
                     className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                      placeholder="userId"
                      value={userId}
                      onChange={(e) => setuserId(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-sm text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 h-0.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {/* <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="w-5 h-5 ml-1 transition-all duration-150 ease-linear border-0 rounded form-checkbox text-blueGray-700"
                      />
                      <span className="ml-2 text-sm text-blueGray-600">
                        Remember Me
                      </span>
                    </label>
                  </div> */}

                  <div className="mt-6 text-center">
                    <button
                      className="w-full px-6 py-2 mb-1 mr-1 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none active:bg-red-200 hover:shadow-lg focus:outline-none"
                      type="submit"
                      style={{ backgroundColor: "#7c0000" }}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="relative flex flex-wrap mt-6">
              <div className="w-1/2">
                <Link to="/auth/forgot" className="text-sm text-blueGray-400">
                  Forgot password?
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-sm text-blueGray-400">
                  Create new account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
