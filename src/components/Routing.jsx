import React, { Component } from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
//importing pages component from
import Home from "./../Pages/Home";
import Contact from "./../Pages/Contact";
import Favourite from "./../Pages/Favourite";
import Header from "./Header";

const Page404 = () => {
  return (
    <div>
      <h1>
        404
        <br />
        Page Not Found!
      </h1>
      {/* <button >
              Back to home
            </button> */}
    </div>
  );
};

class Routing extends Component {
  state = {};
  render() {
    return (
      <div>
        <HashRouter>
          <Header />
          <Switch>
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/home"} component={Home} />
            <Route exact path={"/contact"} component={Contact} />
            <Route exact path={"/favourite"} component={Favourite} />
            <Route exact path={"/contact/:id"} component={Contact} />

            <Route exact path="*" component={Page404} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default Routing;
