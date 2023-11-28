import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import tick from "../../images/green-tick.svg"
import uploadimg from "../../images/upload-img.svg";
import pending from "../../images/amountpending.svg"
import failed from "../../images/amountfailed.svg"
import { Link } from "react-router-dom";
import { getApiCall, textCapitalize, currencyFormatter, showTimeZoneDate } from "gfdu";
import { showToast } from "../../Constants/Utils";
import Loader from "../../components/Loader";
let subuser;
export default class subuserdetails extends Component {
    constructor(props) {
        super(props);
        subuser = this.props.match.params.id;
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
        getApiCall(`subuser/detail/${subuser}`,
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
        console.log(subuser)
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
                                    <div class="detail_card_header"><div class="card-main-title main-color">Sub User Details</div><Link class="btn default_btn m-l-10" to="/subuser"><span>Back</span></Link></div>
                                    <div className="card-body">
                                        <form className="merchant-form">
                                            <div className="col-xs-12 p-0">
                                                <div className="form-group row">
                                                    <div className="col-xs-4">
                                                        <div className="store-form-label" >Sub User Name</div>
                                                        <div className="form-detail">{textCapitalize((details?.name?.full) ? (details?.name?.full ? details?.name?.full : "-") : (details?.name ? details?.name : "-"))}</div>
                                                    </div>
                                                    <div className="col-xs-3">
                                                        <div className="store-form-label">Phone number</div>
                                                        <div className="form-detail">{details?.phone?.national_number ? details?.phone?.national_number : "No Data"}</div>
                                                    </div>

                                                    <div className="col-xs-3">
                                                        <div className="store-form-label">Store Name</div>
                                                        <div className="form-detail">{(details?.store?.name?.store) ? (details?.store?.name?.store) : (details?.store?.name.length > 1 ? details?.store?.name : "No Data")}</div>
                                                    </div>

                                                </div>

                                                <div className="form-group row">

                                                    <div className="col-xs-4">
                                                        <div className="store-form-label" >VPA ID</div>
                                                        <div className="form-detail">{details?.vpa_id ? details?.vpa_id : "No Data"}</div>
                                                    </div>
                                                    <div className="col-xs-3">
                                                        <div className="store-form-label" >Created At</div>
                                                        <div className="form-detail">{showTimeZoneDate(details?.createdAt)}</div>
                                                    </div>

                                                    <div className="col-xs-3">
                                                        <div className="store-form-label" >Status</div>
                                                        <div className="form-detail">{details.status === "active" ? (<img src={tick} />) : (<img src={failed} />)}{" "}{textCapitalize(details?.status)} </div>
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
