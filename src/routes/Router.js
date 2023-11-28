import React, { Component } from "react";
//Utils

import { getCookie } from "gfdu";

//Routers
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
  render = () => {
    return getCookie('merchant_token') ? (
        <PrivateRouter header={this.props.loc}/>
    ) : (
        <PublicRouter />
    );
  };
}

export default Routes;
