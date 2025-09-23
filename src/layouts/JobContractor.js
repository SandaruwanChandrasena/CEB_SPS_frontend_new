import React from "react";
import { Switch, Route} from "react-router-dom";

// components
import Sidebar from "components/Sidebar/Sidebar.js";

//views
import HeaderStatsWithoutCards from "components/Headers/HeaderStatsWithoutCards";
// import AdminNavbar from "components/Navbars/AdminNavbar";
import NewContractor from "views/JobContractor/NewContractor";
import ModifyContractor from "views/JobContractor/ModifyContractor";

export default function JobContractor() {
    return (
        <>
          <Sidebar />
          <div className="relative md:ml-64 bg-blueGray-100">
            {/* <div className="pt-24 bg-lightBlue-600">
            </div> */}
            <HeaderStatsWithoutCards />
            <div className="relative w-full h-screen px-4 mx-auto -m-24 md:px-10">
              <Switch>
                <Route path="/jobcontractor/new" exact component={NewContractor} />
                <Route path="/jobcontractor/modify" exact component={ModifyContractor} />
              </Switch>
            </div>
          </div>
        </>
      );
  }