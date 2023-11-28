import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import tick from "../../images/green-tick.svg"
import uploadimg from "../../images/upload-img.svg";
import { Link } from "react-router-dom";

import pending from "../../images/amountpending.svg"
import failed from "../../images/amountfailed.svg"
import { getApiCall, textCapitalize, currencyFormatter, showTimeZoneDate } from "gfdu";



let trans_id;
export default class Details extends Component {
    constructor(props) {
        super(props);
        trans_id = this.props.match.params.id;
        this.state = {
            sidebarToggle: true,
            details: {}
        };
    }


    componentDidMount() {
        this.details()
    }

    details = () => {
        getApiCall(`transaction/detail/${trans_id}`,
            (response) => {
                this.setState({ details: response.data })
            })
    }

    render() {
        console.log(trans_id)
        let { details } = this.state;
        console.log(details)
        return (
            <>
                <div className="home-section">
                    <div className="home-content">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="card">
                                    <div class="detail_card_header">
                                        <div class="card-main-title main-color">Transaction Details</div>
                                        <Link class="btn default_btn m-l-10" to="/transaction"><span>Back</span></Link>
                                    </div>
                                    <div className="card-body">
                                        <form className="merchant-form">
                                            <div className="col-xs-12 p-0">
                                                <div className="form-group row">
                                                    <div className="col-xs-3">
                                                        <div className="store-form-label" >Customer name</div>
                                                        <div className="form-detail">{details?.customer?.name?.full ? details?.customer?.name?.full : "No Data"}</div>
                                                    </div>
                                                    <div className="col-xs-3">
                                                        <div className="store-form-label">Phone number</div>
                                                        <div className="form-detail">{details?.customer?.phone?.national_number ? details?.customer?.phone?.national_number : "No Data"}</div>
                                                    </div>

                                                    <div className="col-xs-3">
                                                        <div className="store-form-label">Store Name</div>
                                                        <div className="form-detail">{details?.store?.name ? details?.store?.name : "No Data"}</div>
                                                    </div>
                                                    <div className="col-xs-3">
                                                        <div className="store-form-label" >Created At</div>
                                                        <div className="form-detail">{showTimeZoneDate(details?.createdAt ? details?.createdAt : "")}</div>
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <div className="col-xs-3">
                                                        <div className="store-form-label" >Transaction ID</div>
                                                        <div className="form-detail">{details?.trans_id}</div>
                                                    </div>
                                                    <div className="col-xs-3">
                                                        <div className="store-form-label">Payment Mode</div>
                                                        <div className="form-detail">{textCapitalize(details?.payment?.mode) ? textCapitalize(details?.payment?.mode) : "--"}</div>
                                                    </div>
                                                    <div className="col-xs-3">
                                                        <div className="store-form-label" >Total</div>
                                                        <div className="form-detail rupee">{currencyFormatter(details?.grand_total, "INR")}</div>
                                                    </div>
                                                    <div className="col-xs-3">
                                                        <div className="store-form-label" >Status</div>
                                                        <div className="form-detail">{details.status === "success" ? (<img src={tick} />) : details.status === "pending" ? (<img src={pending} />) : (<img src={failed} />)}{" "}{details?.status} </div>
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
