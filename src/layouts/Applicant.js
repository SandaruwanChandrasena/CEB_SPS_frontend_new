import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import Sidebar from "components/Sidebar/Sidebar.js";
// import FooterAdmin from "components/Footers/FooterAdmin.js";

//views
import NewApplicant from "views/applicant/NewApplicant";
import ModifyApplicant from "views/applicant/ModifyApplicant";
// import AdminNavbar from "components/Navbars/AdminNavbar";
import HeaderStatsWithoutCards from "components/Headers/HeaderStatsWithoutCards";

export default function Applicant() {
    return (
        <>
          <Sidebar />
          <div className="relative flex flex-col min-h-screen md:ml-64 bg-white">
            {/* Content Wrapper */}
            <HeaderStatsWithoutCards />
            <div className="flex-grow">
              {/* <div className="pt-32 bg-lightBlue-600"></div> */}
              <div className="relative w-full px-4 mx-auto -m-24 md:px-10 ">
                <Switch>
                  <Route path="/applicant/newapplicant" exact component={NewApplicant} />
                  <Route path="/applicant/modifyapplicant" exact component={ModifyApplicant} />
                  <Redirect from="/applicant" to="/applicant/newapplicant" />
                </Switch>
              </div>
            </div>

            {/* Footer Always at Bottom */}
            {/* <FooterAdmin /> */}
          </div>
        </>
    );
}
