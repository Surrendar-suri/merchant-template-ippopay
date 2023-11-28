import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import tick from "../../images/green-tick.svg"
import uploadimg from "../../images/upload-img.svg";
import { Link } from "react-router-dom";
import { getApiCall } from "gfdu";
import { showToast, textCapitalize } from "../../Constants/Utils";
import Loader from "../../components/Loader";

let submerchant_id;
export default class Storedetails extends Component {
    constructor(props) {
        super(props);
        submerchant_id = this.props.match.params.id;
        this.state = {
            sidebarToggle: true,
            details: {},
            loading: true,
        };
    }


    componentDidMount() {
        this.details()
    }


    details = () => {
        getApiCall(`sub-merchant/detail/${submerchant_id}`,
            (response) => {
                if (response.success) {
                    this.setState({ details: response.data, loading: false })
                }
                else {
                    this.setState({ loading: false })
                    showToast("error", response.message);
                }
            })
    }

    render() {

        let { details } = this.state;
        console.log(details)
        return (
            <>
                {this.state.loading && <Loader />}
                <div className="home-section">
                    <div className="home-content">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="card">
                                    <div class="detail_card_header"><div class="card-main-title main-color">Sub Merchant Details</div><Link class="btn default_btn m-l-10" to="/submerchant"><span>Back</span></Link></div>
                                    <div className="card-body">
                                        <form className="merchant-form">
                                            <div className="col-xs-12 p-0">
                                                <div className="form-group row">
                                                    {/* <div className="col-xs-3">
                                                        <div className="store-form-label">Business name</div>
                                                        <div className="form-detail">{details?.business?.name}</div>
                                                    </div> */}
                                                    <div className="col-xs-4">
                                                        <div className="store-form-label" >Merchant name</div>
                                                        <div className="form-detail">{details?.name?.full}</div>
                                                    </div>
                                                    <div className="col-xs-2">
                                                        <div className="store-form-label">Merchant ID</div>
                                                        <div className="form-detail" >{details?.merchant_id}</div>
                                                    </div>
                                                    <div className="col-xs-2">
                                                        <div className="store-form-label">Role</div>
                                                        <div className="form-detail" >{textCapitalize(details?.role === "subuser" ? "Sub Merchant" : details?.role)}</div>
                                                    </div>
                                                    <div className="col-xs-2">
                                                        <div className="store-form-label" >Phone Number</div>
                                                        <div className="form-detail">+91 {details?.phone?.national_number}</div>
                                                    </div>
                                                </div>
                                                <div className="info-detail">
                                                    Contact Address
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-xs-4">
                                                        <div className="store-form-label">Address</div>
                                                        <div className="form-detail">{details?.location?.agent_store?.flat_no}{" "}{details?.location?.agent_store?.street_name}{" "}{details?.location?.agent_store?.area}</div>
                                                    </div>
                                                    <div className="col-xs-2">
                                                        <div className="store-form-label" >City</div>
                                                        <div className="form-detail">{details?.location?.agent_store?.city}</div>
                                                    </div>
                                                    <div className="col-xs-2">
                                                        <div className="store-form-label" >State</div>
                                                        <div className="form-detail">{details?.location?.agent_store?.state}</div>
                                                    </div>
                                                    <div className="col-xs-2">
                                                        <div className="store-form-label" >Pin Code</div>
                                                        <div className="form-detail">{details?.location?.agent_store?.pincode}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>


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
