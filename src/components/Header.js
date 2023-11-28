import { getApiCall, getCookie, reloadWindow, setCookie, textCapitalize } from "gfdu";
import React, { Component } from "react";
import { BrowserRouter, Link } from 'react-router-dom';
import ApiGateWay from "../Constants/ApiCall";
import { Select } from "antd";
import { showToast } from "../Constants/Utils";
import Tooltip from "antd/es/tooltip";
export default class Header extends Component {
    handleToggleSideBar = () => {
        var sidebarbtn = document.querySelector(".sidebar");
        var menusidebar = document.querySelector("#menubtn");
        sidebarbtn.classList.toggle("open_sidebar");
        menusidebar.classList.toggle("bx-menu-alt-right");
    };

    render() {
        let merchantobj = JSON.parse(getCookie("merchantobject"));
        const { Option } = Select;
        return (
            <>
                <div className="home-header">
                    <div className="header_menubtn">
                        <i className="bx bx-menu" id="menubtn" onClick={() => this.handleToggleSideBar()} />
                        <span className="text">
                            {textCapitalize(this.props.headTitle === "subuser" ? "Sub User" : this.props.headTitle === "settlementbank" ? "Settlement Bank" : this.props.headTitle === "submerchant" ? "Sub Merchant" : this.props.headTitle)}
                            {/*  {this.props.headTitle == 'transaction' ? 'Transactions' : this.props.headTitle == 'store' ? 'Stores' : ''} */}
                        </span>
                    </div>
                    <Tooltip title="Profile">
                    <Link to={"/profile"} className="profile-details">
                        <i className="bx bx-user-circle profile_user" />
                        <span className="admin_name">{merchantobj.Owner_name ? merchantobj.Owner_name : "Counter Name"}</span>
                        <i className="bx bx-chevron-right header-arrow"></i>
                    </Link>
                    </Tooltip>
                </div>
            </>
        );
    }
}
