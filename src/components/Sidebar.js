import React, { Component } from "react";
import cookie from "react-cookies";
import ippoPay from "../images/ippopay_white.svg";
import logo_icon from "../images/logo_icon.svg";
import logo_symbol from "../images/logo-symbol.svg";
import logotext from "../images/logo-text.svg";
import ApiGateWay from "../Constants/ApiCall";
import { showToast } from "../Constants/Utils";
import { Link, NavLink } from "react-router-dom";
import { getCookie, deleteApiCall, removeCookie, reloadWindowToPath } from "gfdu";
import ippostrorelogo from "../images/Ippostoretextlogo.svg"


let checking = "merchant";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarToggle: true,
      sidebarSubMenu: true,
    };
  }

  handleLogout = () => {

    deleteApiCall("dashboard/logout", "", (response) => {
      if (response.success) {
        showToast("success", response.message);
        cookie.remove("merchant_token");
        cookie.remove("CsrfToken");
        localStorage.removeItem('merchant_detail')
        removeCookie("storeId")
        window.location.href = "/signin"

      } else {
        showToast("error", response.message);
      }
    });
  };

  handleToggleSideBar = () => {
    var element = document.querySelector(".sidebar");
    element.classList.toggle("open_sidebar");
  };
  // removeParamsName = () => {
  //   reloadWindowToPath(window.location.href.split("?")[0])
  // }

  render() {
    let merchantobj = JSON.parse(getCookie('merchantobject'));

    // JSON.parse(getCookie('merchantobject'))


    return (

      <>
        <div className="sidebar open_sidebar ">
          <div className="sidebar_logo">
            <div className="logo-details" >
              <span className="logo-symbol">
                <img src={logo_symbol} width={42} height={42} />
              </span>
              <span className="logo_name"><img src={ippostrorelogo} height={50} /></span>
            </div>
          </div>

          {merchantobj.role === "merchant" ?
            <ul className="nav-list">
              <div className="sidebar_list">
                <li><span className="menu-head">Menu</span></li>
                <li>
                  <NavLink activeClassName="active" to="/dashboard">
                    <i className="bx bx-grid-alt" />
                    <span className="links_name">Dashboard</span>
                  </NavLink>
                  <span className="sidebar-tooltip">Dashboard</span>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/transaction">
                    <i className="bx bx-transfer-alt" />
                    <span className="links_name">Transactions</span>
                  </NavLink>
                  <span className="sidebar-tooltip">Transactions</span>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/settlement">
                    <i className="fa fa-handshake-o" />
                    <span className="links_name">Settlement</span>
                  </NavLink>
                  <span className="sidebar-tooltip">Settlement</span>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/store">
                    <i className="bx bx-store-alt" />
                    <span className="links_name">Stores</span>
                  </NavLink>
                  <span className="sidebar-tooltip">Stores</span>
                </li>
                <li><span className="menu-head" style={{ marginTop: "35px" }}>Settings</span></li>
                <li>
                  <NavLink activeClassName="active" to="/subuser">
                    <i className="bx bx-group" />
                    <span className="links_name">Sub Users</span>
                  </NavLink>
                  <span className="sidebar-tooltip">Sub Users</span>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/submerchant">
                    <i className="bx bx-user-plus " />
                    <span className="links_name">Sub Merchant</span>
                  </NavLink>
                  <span className="sidebar-tooltip">Sub Merchant</span>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/settlementbank">
                    <i className="bx bxs-bank" />
                    <span className="links_name">Settlement Bank</span>
                  </NavLink>
                  <span className="sidebar-tooltip">Settlement Bank</span>
                </li>
                {/* <li>
                <NavLink activeClassName="active" to="/vpa">
                  <i className="bx bx-user-circle" />
                  <span className="links_name">Vpa List</span>
                </NavLink>
                <span className="sidebar-tooltip">Vpa List</span>
              </li> */}
                <li>
                  <NavLink activeClassName="active" to="/profile">
                    <i className="bx bx-user-circle" />
                    <span className="links_name">Profile</span>
                  </NavLink>
                  <span className="sidebar-tooltip">Profile</span>
                </li>
                <li className="profile" onClick={this.handleLogout}>
                  <div className="profile-details">
                    <i />
                    <div  className="name_job">
                      <div className="name">Logout</div>
                    </div>
                  </div>
                  <i  className="bx bx-log-out" id="log_out" />
                </li>
              </div>
            </ul> : merchantobj.role === "subuser" ?

              // SUBMERCHANT

              <ul className="nav-list">
                <div className="sidebar_list">
                  <li><span className="menu-head">Menu</span></li>
                  <li>
                    <NavLink activeClassName="active" to="/dashboard">
                      <i className="bx bx-grid-alt" />
                      <span className="links_name">Dashboard</span>
                    </NavLink>
                    <span className="sidebar-tooltip">Dashboard</span>
                  </li>
                  <li>
                    <NavLink activeClassName="active" to="/transaction">
                      <i className="bx bx-transfer-alt" />
                      <span className="links_name">Transactions</span>
                    </NavLink>
                    <span className="sidebar-tooltip">Transactions</span>
                  </li>
                  <li>
                    <NavLink activeClassName="active" to="/settlement">
                      <i className="fa fa-handshake-o" />
                      <span className="links_name">Settlement</span>
                    </NavLink>
                    <span className="sidebar-tooltip">Settlement</span>
                  </li>
                  <li>
                    <NavLink activeClassName="active" to="/store">
                      <i className="bx bx-store-alt" />
                      <span className="links_name">Stores</span>
                    </NavLink>
                    <span className="sidebar-tooltip">Stores</span>
                  </li>
                  <li><span className="menu-head" style={{ marginTop: "35px" }}>Settings</span></li>
                  <li>
                    <NavLink activeClassName="active" to="/subuser">
                      <i className="bx bx-group" />
                      <span className="links_name">Sub Users</span>
                    </NavLink>
                    <span className="sidebar-tooltip">Sub Users</span>
                  </li>


                  <li>
                    <NavLink activeClassName="active" to="/profile">
                      <i className="bx bx-user-circle" />
                      <span className="links_name">Profile</span>
                    </NavLink>
                    <span className="sidebar-tooltip">Profile</span>
                  </li>
                  <li className="profile">
                    <div className="profile-details">
                      <i />
                      <div onClick={this.handleLogout} className="name_job">
                        <div className="name">Logout</div>
                      </div>
                    </div>
                    <i onClick={this.handleLogout} className="bx bx-log-out" id="log_out" />
                  </li>

                </div>
              </ul> :

              //Subuser
              <ul className="nav-list">
                <div className="sidebar_list">
                  <li><span className="menu-head">Menu</span></li>
                  {/* <li>
    <NavLink activeClassName="active" to="/dashboard">
      <i className="bx bx-grid-alt" />
      <span className="links_name">Dashboard</span>
    </NavLink>
    <span className="sidebar-tooltip">Dashboard</span>
  </li> */}
                  <li>
                    <NavLink activeClassName="active" to="/transaction">
                      <i className="bx bx-transfer-alt" />
                      <span className="links_name">Transactions</span>
                    </NavLink>
                    <span className="sidebar-tooltip">Transactions</span>
                  </li>
                  {/* <li>
    <NavLink activeClassName="active" to="/settlement">
      <i className="fa fa-handshake-o" />
      <span className="links_name">Settlement</span>
    </NavLink>
    <span className="sidebar-tooltip">Settlement</span>
  </li> */}

                  <li><span className="menu-head" style={{ marginTop: "35px" }}>Settings</span></li>
                  <li>
                    <NavLink activeClassName="active" to="/profile">
                      <i className="bx bx-user-circle" />
                      <span className="links_name">Profile</span>
                    </NavLink>
                    <span className="sidebar-tooltip">Profile</span>
                  </li>
                  <li className="profile" onClick={this.handleLogout}>
                    <div className="profile-details " onClick={this.handleLogout}>
                      <i />
                      <div onClick={this.handleLogout} className="name_job">
                        <div className="name">Logout</div>
                      </div>
                    </div>
                    <i onClick={this.handleLogout} className="bx bx-log-out" id="log_out" />
                  </li>

                </div>
              </ul>

          }
        </div>
      </>
    );
  }
}
