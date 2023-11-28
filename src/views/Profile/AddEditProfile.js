import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import tick from "../../images/green-tick.svg"
import uploadimg from "../../images/upload-img.svg";
import { Link } from "react-router-dom";
import {
    SearchOutlined,
    ClearOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import { Select } from 'antd';
const { Option } = Select;

export default class AddEditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarToggle: true,
        };
    }
    componentDidMount() {
    }

    render() {
        return (
            <>
                <div className="home-section">
                    <div className="home-content">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="table-tabs m-0">
                                            <ul className="nav nav-pills m-b-30">
                                                <li className="active">
                                                    <span data-toggle="pill" href="#section-bar-1" className="merchant-tabs">Merchant Details </span>
                                                </li>
                                                <li>
                                                    <span data-toggle="pill" href="#section-bar-2" className="merchant-tabs  m-l-30">Documents</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <button className="btn default_btn m-l-10">
                                            <span>Back </span>
                                        </button>
                                    </div>

                                    <div className="card-body">
                                        <div className="tab-content">
                                            <form className="merchant-form tab-pane active in" id="section-bar-1">
                                                <div className="col-xs-12 p-0">
                                                    <div className="form-group row">
                                                        <div className="col-xs-3">
                                                            <label className="store-form-label" htmlFor="name">Business name</label>
                                                            <input className="form-control" id="name" type="text" />
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <label className="store-form-label" htmlFor="code">Unique code</label>
                                                            <input className="form-control" id="code" type="text" />
                                                        </div>
                                                        <div className="col-xs-3">

                                                        </div>
                                                        <div className="col-xs-3">
                                                            <label className="store-form-label" htmlFor="id">Merchant ID</label>
                                                            <input className="form-control" id="id" type="text" value="123354" style={{ background: "#F2F2F2" }} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-xs-3">
                                                            <label className="store-form-label" htmlFor="name">Merchant name</label>
                                                            <input className="form-control" id="name" type="text" />
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <label className="store-form-label" htmlFor="phone">Mobile number</label>
                                                            <input className="form-control" id="phone" type="text" />
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <label className="store-form-label" htmlFor="email">Email address</label>
                                                            <input className="form-control" id="email" type="text" />
                                                        </div>
                                                    </div>
                                                    <div className="info-detail">
                                                        Contact Details
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-xs-6">
                                                            <label className="store-form-label" htmlFor="address">Address</label>
                                                            <input className="form-control" id="address" type="text" />
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <label className="store-form-label" htmlFor="city">City</label>
                                                            <input className="form-control" id="city" type="text" value="chennai" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-xs-3">
                                                            <label className="store-form-label" htmlFor="state">State</label>
                                                            <Select className="form-control" id="state"
                                                                showArrow
                                                                allowClear
                                                                defaultValue="Select"
                                                                clearIcon={<ClearOutlined />}
                                                            >
                                                                <Option value="Tamilnadu">Tamilnadu</Option>
                                                                <Option value="Kerala">Kerala</Option>
                                                            </Select>
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <label className="store-form-label" htmlFor="city">Pin Code</label>
                                                            <input className="form-control" id="city" type="text" value="600032" />
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-xs-12 p-0 btn-mt">
                                                    <Link className="btn btn-primary primary-btn">Save & Continue</Link>
                                                </div>
                                            </form>
                                            <form className="merchant-form tab-pane" id="section-bar-2">
                                                <div className="col-xs-12 p-0">
                                                    <div className="form-group row">
                                                        <div className="col-xs-3">
                                                            <label className="store-form-label" htmlFor="Merchant-type">Merchant Type</label>
                                                            <Select className="form-control" id="Merchant-type"
                                                                showArrow
                                                                allowClear
                                                                defaultValue="Select"
                                                                clearIcon={<ClearOutlined />}
                                                            >
                                                                <Option value="mac">Mac Private</Option>
                                                                <Option value="fresh">Fresh Fields</Option>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-xs-12"><label className="store-form-label">Upload incorporation certificate/ Moa</label></div>
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
                                                            <label className="store-form-label" htmlFor="registration">Registration certificate or gst no</label>
                                                            <input className="form-control" id="registration" type="text" />
                                                            <div className="image-box m-t-15">
                                                                <div className="logo_upload">
                                                                    <img className="active" src={uploadimg} />
                                                                    <div className="upload-text">Upload Certificate Photocopy</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-1"></div>
                                                        <div className="col-xs-3" style={{ marginLeft: "50px" }}>
                                                            <label className="store-form-label" htmlFor="pan">Company Pan Number</label>
                                                            <input className="form-control" id="pan" type="text" value="000000" />
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
                                                            <label className="store-form-label" htmlFor="Merchant-type">KYC document type</label>
                                                            <Select className="form-control" id="Merchant-type"
                                                                showArrow
                                                                allowClear
                                                                defaultValue="Select Document Type"
                                                                clearIcon={<ClearOutlined />}
                                                            //  removeIcon
                                                            >
                                                                <Option value="Pan">Pan Card</Option>
                                                                <Option value="Aadhaar">Aadhaar Card</Option>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-xs-3">
                                                            <label className="store-form-label" htmlFor="pan">Aadhar Number</label>
                                                            <input className="form-control" id="pan" type="text" value="0000 0000 0000" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 p-0 btn-mt">
                                                    <Link className="btn btn-primary primary-btn">Save & Continue</Link>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
