import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "./Content";
class MainRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render = () => {
        return(
    <>
      <div className="ip-merchant-page">
        <Sidebar />
        <Header searchParamsList={this.props.searchParams} headTitle={this.props.headerTitle} />
        <Content />
      </div>
    </>
    )
    }
}
export default MainRouter;
