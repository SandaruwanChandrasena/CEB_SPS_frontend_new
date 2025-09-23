import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ceblogo from "assets/img/ceb-logo-and-wave.png";

// views

import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";

export default function Auth() {
  return (
    <>
      {/* <Navbar transparent /> */}
      <main>
        <section
          className="relative w-full h-full min-h-screen"
          style={{ height: "100vh" }}
        >
          <div
            className="absolute top-0 w-full h-full bg-white bg-no-repeat bg-full"
            style={{
              backgroundImage: `url(${ceblogo})`,
              backgroundPosition: "bottom", 
              opacity:0.6,
              zIndex: -1,
            }}
          ></div>
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
          {/* <FooterSmall absolute /> */}
        </section>
      </main>
    </>
  );
}
