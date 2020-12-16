import React, { Component } from "react";
import { Route } from "react-router-dom";
import {
  Match,
  Navbar,
  Profile,
  Requests,
} from "../";

class Home extends Component {
  render() {
    return (
      <div>
        {window.location.pathname !== "/LogOut" ? (
          window.location.pathname !== "/register" ? (
            window.location.pathname !== "/login" ? (
              <Navbar />
            ) : null
          ) : null
        ) : null}
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Match" component={Match} />
        <Route exact path="/Profile" component={Profile} />
        <Route exact path="/Requests" component={Requests} />
      </div>
    );
  }
}

export default Home;
