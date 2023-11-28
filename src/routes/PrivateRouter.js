import React, { Component } from "react";
import MainRouter from "./MainRouter";

class PrivateRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
  render = () => {
    return <MainRouter searchParams={this.props.header.location.search} headerTitle={this.props.header.location.pathname.replace(/^\/([^\/]*).*$/, '$1')} />;
  };
}

export default PrivateRouter;
