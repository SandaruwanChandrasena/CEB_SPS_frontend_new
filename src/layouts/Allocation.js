import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import Sidebar from "components/Sidebar/Sidebar.js";
// import FooterAdmin from "components/Footers/FooterAdmin.js";
// import ModProgress from "views/ModifyProgress/ModProgress";
// import AddProMile from "views/ModifyProgress/AddProMile";
import NewPiv from "views/piv/NewPiv";
import AllocationOCJ1 from "views/Allocation/AllocationOCJ1";
// import AdminNavbar from "components/Navbars/AdminNavbar";
import HeaderStatsWithoutCards from "components/Headers/HeaderStatsWithoutCards";



export default function Allocation() {
    return (
        <>
          <Sidebar />
          <div className="relative flex flex-col min-h-screen md:ml-64 bg-blueGray-100">
            {/* Content Wrapper */}
            <HeaderStatsWithoutCards />
            <div className="flex-grow">
              {/* <div className="pt-32 bg-lightBlue-600"></div> */}
              <div className="relative w-full px-4 mx-auto -m-24 md:px-10 ">
                <Switch>
                  {/* <Route path="/applicant/newapplicant" exact component={NewApplicant} /> */}
                  <Route path="/piv/newPiv" exact component={NewPiv} />
                  <Route path="/allocation/allocationOCJ1" exact component={AllocationOCJ1} />
                  {/* <Route path="/modifyProgress/addProMile" exact component={AddProMile} />
                  <Route path="/modifyProgress/modProgress" exact component={ModProgress} /> */}
                  <Redirect from="/modifyProgress" to="/modifyProgress/modProgress" />
                </Switch>
              </div>
            </div>

            {/* Footer Always at Bottom */}
            {/* <FooterAdmin /> */}
          </div>
        </>
    );
}
