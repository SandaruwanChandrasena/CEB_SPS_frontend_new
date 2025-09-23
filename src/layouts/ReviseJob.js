import React from "react";
import { Switch, Route} from "react-router-dom";

// components
import Sidebar from "components/Sidebar/Sidebar.js";

//views
import HeaderStatsWithoutCards from "components/Headers/HeaderStatsWithoutCards";
import NewJob from "views/ReviseJob/NewJob";
import EditJob from "views/ReviseJob/EditJob";

export default function ReviceJob() {
    return (
        <>
          <Sidebar />
          <div className="relative md:ml-64 bg-blueGray-100">
            {/* <div className="pt-24 bg-lightBlue-600">
            </div> */}
            <HeaderStatsWithoutCards />
            <div className="relative w-full h-screen px-4 mx-auto -m-24 md:px-10">
              <Switch>
                <Route path="/jobrevision/new" exact component={NewJob} />
                <Route path="/jobrevision/modify" exact component={EditJob} />
              </Switch>
            </div>
          </div>
          {/* Footer Always at Bottom */}
          {/* <FooterAdmin /> */}
        </>
      );
  }