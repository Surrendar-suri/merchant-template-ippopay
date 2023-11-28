import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import tick from "../../images/green-tick.svg"
import uploadimg from "../../images/upload-img.svg";
import { Link } from "react-router-dom";
import failed from "../../images/amountfailed.svg"
import { getApiCall, textCapitalize, currencyFormatter, showTimeZoneDate } from "gfdu";
import createdicon from "../../images/created.svg"
import settledicon from "../../images/settled.svg"



let settlement_id;
export default class Settlementdetails extends Component {
    constructor(props) {
        super(props);
        settlement_id = this.props.match.params.id;
        this.state = {
            sidebarToggle: true,
            details: []
        };
    }


    componentDidMount() {
        this.details()
    }


    details = () => {
        getApiCall(`settlement/detail/${settlement_id}`,
            (response) => {
                this.setState({ details: response.data })
            })
    }






    render() {
        console.log(settlement_id)
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
                                        <div class="card-main-title main-color">Settlement Details</div>
                                        <Link class="btn default_btn m-l-10" to="/settlement"><span>Back</span></Link>
                                    </div>
                                    <div className="card-body">
                                        <form className="merchant-form">
                                            <div className="col-xs-12 p-0">
                                                <div className="form-group row">
                                                    <div className="col-xs-3">
                                                        <div className="store-form-label">Merchant Name</div>
                                                        <div className="form-detail">{details?.merchant?.name}</div>
                                                    </div>
                                                    <div className="col-xs-3">
                                                        <div className="store-form-label">Merchant ID</div>
                                                        <div className="form-detail" >{details?.merchant?.id}</div>
                                                    </div>

                                                    <div className="col-xs-3">
                                                        <div className="store-form-label">Status</div>
                                                        <div className="form-detail" ><img src={details?.status === "created" ? createdicon : settledicon}></img>{" "}{textCapitalize(details?.status)}</div>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-xs-3">
                                                        <div className="store-form-label" >Settlement Amount</div>
                                                        <div className="form-detail rupee">{currencyFormatter(details?.settlement_amount, "INR")}</div>
                                                    </div>

                                                    <div className="col-xs-3">
                                                        <div className="store-form-label" >Settlement Date</div>
                                                        <div className="form-detail" >{showTimeZoneDate(details?.settlement_date)}</div>
                                                    </div>

                                                    <div className="col-xs-3">
                                                        <div className="store-form-label" >VPA ID</div>
                                                        <div className="form-detail" >{details?.vpa_details?.id}</div>
                                                    </div>


                                                    <div className="col-xs-3">
                                                        <div className="store-form-label" >Settlement Type</div>
                                                        <div className="form-detail" >{textCapitalize(details?.settlement_type)}</div>
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
