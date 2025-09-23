
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
// import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// components
import EstimateForm from "../views/estimate/EstimateForm";
import HeaderStatsWithoutCards from "components/Headers/HeaderStatsWithoutCards";

export default function Estimate() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <HeaderStatsWithoutCards/>
        <div className="w-full px-4 mx-auto -m-24 md:px-10">
          <Switch>
            <Route path="/estimate/estimateform" exact component={EstimateForm} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}

