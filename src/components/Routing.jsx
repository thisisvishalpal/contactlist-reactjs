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
            <Route exact path={"/Home"} component={Home} />
            <Route exact path={"/Contact"} component={Contact} />
            <Route exact path={"/Favourite"} component={Favourite} />
            <Route exact path="*" component={Page404} />

            {/* <Route exact path={"/hourly/:id"} component={Hourly} />
                <Route exact path={"/bundle/:id"} component={Bundle} /> */}
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default Routing;
