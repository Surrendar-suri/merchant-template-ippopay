import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import tick from "../../images/green-tick.svg"
import uploadimg from "../../images/upload-img.svg";
import { Link } from "react-router-dom";
import { getApiCall, getCookie } from "gfdu"
import { theme } from "antd";
import passopeneye from "../../images/password.svg"
import passclosedeye from "../../images/passwordclose.svg"
import Loader from "../../components/Loader";
import { textCapitalize } from "../../Constants/Utils";


export default class ProfileDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarToggle: true,
            merchantdetails: true,
            merchantdocument: false,
            passwordshow: false,
            loading: true
        };
    }


    componentDidMount() {
        this.details()
    }
    passwordshow = () => {

        this.setState({ passwordshow: !this.state.passwordshow })
    }
    details = () => {
        let merchant = {}
        merchant = JSON.parse(getCookie("merchantobject"));
        let role = merchant.role === "merchant" ? "merchant" : merchant.role === "subuser" ? "merchant" : "subuser";

        let queryparams = "";
        queryparams += role === "" ? "" : role == null ? "" : "&agent_type=" + role;



        getApiCall(`dashboard/profile?${queryparams}`,
            (response) => {
                console.log(response)
                this.setState({ profile: response?.data, loading: false })
            })
    }


    render() {
        let merchantobj = JSON.parse(getCookie('merchantobject'));

        let { profile, passwordshow } = this.state;
        return (
            <>
                {this.state.loading && <Loader />}

                <div className="home-section">
                    <div className="home-content">
                        <div className="row">
                            <div className="col-xs-12">
                                {merchantobj.role === "store_subuser" ?
                                    <div>

                                        <div className="tab-content">
                                            <form className="merchant-form tab-pane active in" id="section-bar-1">
                                                <div className="col-xs-12 p-0">
                                                    <div className="form-group row">
                                                        {/* <div className="col-xs-3">
                                                            <div className="store-form-label">Business name</div>
                                                             <div className="form-detail">{profile?.business?.name}</div>
                                                        </div> */}

                                                        <div className="col-xs-4">
                                                            <div className="store-form-label">Sub-USER Name</div>
                                                            <div className="form-detail card" ><div className="card-body">{profile?.name}</div></div>
                                                        </div>
                                                        <div className="col-xs-4">
                                                            <div className="store-form-label">Mobile number</div>
                                                            <div className="form-detail card"> <div className="card-body">+91 {profile?.phone?.national_number}</div></div>
                                                        </div>
                                                        <div className="col-xs-4">
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-xs-4">
                                                            <div className="store-form-label">Store Name</div>
                                                            <div className="form-detail card" ><div className="card-body">{(profile?.store?.name?.store) ? (profile?.store?.name?.store) : (profile?.store?.name)}</div></div>
                                                        </div>

                                                        <div className="col-xs-4">
                                                            <div className="store-form-label" >Counter Name</div>
                                                            <div className="form-detail card"> <div className="card-body">{profile?.name}</div></div>
                                                        </div>
                                                        <div className="col-xs-4">
                                                            <div className="store-form-label">VPA Name</div>
                                                            <div className="form-detail card" ><div className="card-body">{profile?.vpa_id ? profile?.vpa_id : "No VPA Assigned"}</div></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    :
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="table-tabs m-0">
                                                <ul className="nav nav-pills m-b-30">
                                                    <li className="active">
                                                        <span data-toggle="pill" href="#section-bar-1" className="merchant-tabs">Merchant Details</span>
                                                    </li>
                                                    <li>
                                                        <span data-toggle="pill" href="#section-bar-2" className="merchant-tabs  m-l-30">Documents</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* <Link to="/profile/edit" className="btn default_btn m-l-10" >
                                            <span>Edit </span>
                                        </Link> */}
                                        </div>
                                        <div className="card-body">
                                            <div className="tab-content">
                                                <form className="merchant-form tab-pane active in" id="section-bar-1">
                                                    <div className="col-xs-12 p-0">
                                                        <div className="form-group row">
                                                            <div className="col-xs-3">
                                                                <div className="store-form-label">Business name</div>
                                                                <div className="form-detail">{profile?.name?.store}</div>
                                                            </div>
                                                            <div className="col-xs-3">
                                                                <div className="store-form-label">Merchant ID</div>
                                                                <div className="form-detail" >{profile?.merchant_id}</div>
                                                            </div>
                                                            <div className="col-xs-3">
                                                                <div className="store-form-label" >Unique code</div>
                                                                <a className="form-detail" style={{ position: "relative" }}>
                                                                    <input type={passwordshow === true ? "text" : "password"} style={{ background: "#F2F2F2", padding: "6px 10px", borderRadius: "6px", border: 0, width: "200px" }} value={profile?.merchant_code ? profile?.merchant_code : "NO DATA"} />
                                                                    <img style={{ position: "absolute", right: "6px", top: "1px" }} width={20} onClick={this.passwordshow} src={passwordshow === true ? passopeneye : passclosedeye} />
                                                                </a>
                                                            </div>
                                                            <div className="col-xs-3">
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <div className="col-xs-3">
                                                                <div className="store-form-label" >Merchant name</div>
                                                                <div className="form-detail">{profile?.name?.full}</div>
                                                            </div>
                                                            <div className="col-xs-3">
                                                                <div className="store-form-label">Mobile number</div>
                                                                <div className="form-detail">+91 {profile?.phone?.national_number}</div>
                                                            </div>
                                                            <div className="col-xs-3">
                                                                <div className="store-form-label" >Email address</div>
                                                                <div className="form-detail">{profile?.email?.primary}</div>
                                                            </div>
                                                        </div>
                                                        <div className="info-detail">
                                                            Contact Address
                                                        </div>
                                                        <div className="form-group row">
                                                            <div className="col-xs-3">
                                                                <div className="store-form-label">Address</div>
                                                                <div className="form-detail">{profile?.location?.agent_store?.flat_no}{" "}{profile?.location?.agent_store?.street_name}{" "}{profile?.location?.agent_store?.area}</div>
                                                            </div>
                                                            <div className="col-xs-3">
                                                                <div className="store-form-label" >City</div>
                                                                <div className="form-detail">{profile?.location?.agent_store?.city}</div>
                                                            </div>
                                                            <div className="col-xs-3">
                                                                <div className="store-form-label" >State</div>
                                                                <div className="form-detail">{profile?.location?.agent_store?.state}</div>
                                                            </div>
                                                            <div className="col-xs-3">
                                                                <div className="store-form-label" >Pin Code</div>
                                                                <div className="form-detail">{profile?.location?.agent_store?.pincode}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                                <form className="merchant-form tab-pane" id="section-bar-2">
                                                    <div className="col-xs-12 p-0">
                                                        <div className="form-group row">
                                                            <div className="col-xs-3">
                                                                <div className="store-form-label" htmlFor="Merchant-type">Merchant Type</div>
                                                                <div className="form-detail fs-18 fs-bold">Private limited</div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <div className="col-xs-12"><div className="store-form-label">Upload incorporation certificate/ Moa</div></div>
                                                            <div className="col-xs-12">
                                                                <div className="image-box">
                                                                    <div className="logo_upload">
                                                                        <img className="active" src={uploadimg} />
                                                                    </div>
                                                                </div>
                                                                <div className="image-box">
                                                                    <div className="logo_upload">
                                                                        <img src={uploadimg} />

                                                                    </div>
                                                                </div>
                                                                <div className="image-box">
                                                                    <div className="logo_upload">
                                                                        <img src={uploadimg} />

                                                                    </div>
                                                                </div>
                                                                <div className="image-box">
                                                                    <div className="logo_upload">
                                                                        <img src={uploadimg} />
                                                                    </div>
                                                                </div>
                                                                <div className="image-box">
                                                                    <div className="logo_upload">
                                                                        <img src={uploadimg} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="info-detail"></div>
                                                        <div className="form-group row">
                                                            <div className="col-xs-3">
                                                                <div className="store-form-label" htmlFor="registration">Registration certificate or gst no</div>
                                                                <div className="form-detail">93840983347</div>
                                                                <div className="image-box m-t-15">
                                                                    <div className="logo_upload">
                                                                        <img className="active" src={uploadimg} />
                                                                        <div className="upload-text">Upload Certificate Photocopy</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xs-1"></div>
                                                            <div className="col-xs-3 md-ml">
                                                                <div className="store-form-label" htmlFor="pan">Company Pan Number</div>
                                                                <div className="form-detail">GHKPS66945B</div>
                                                                <div className="image-box m-t-15">
                                                                    <div className="logo_upload">
                                                                        <img className="active" src={uploadimg} />
                                                                        <div className="upload-text">Upload PAN Photocopy</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="info-detail"></div>
                                                        <div className="form-group row">
                                                            <div className="col-xs-3">
                                                                <div className="store-form-label" htmlFor="Merchant-type">KYC document type</div>
                                                                <div className="form-detail fs-12" style={{ textTransform: "uppercase" }}>Aadhaar Number</div>
                                                                <div className="form-detail">9298 2828 2949 8684</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>}



                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
