import React, { Component } from "react";
import { Redirect, Route, Switch, HashRouter } from "react-router-dom";
import Login from "../views/Login/login";
import NewLogin from "../views/Login/newlogin";

//Pages

class PublicRouter extends Component {
  render = () => {
    return (
      <Switch>
          <Route path="/" exact render={() => <Redirect to="/signin" />} />
          <Route path="/signin" exact component={NewLogin} />
          <Route render={() => <Redirect to="/signin" />} />
          <Route path="/dashboard" render={() => <Redirect to="/signin" />} />
      </Switch>
    );
  };
}

export default PublicRouter;
