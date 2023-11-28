import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import { Link } from "react-router-dom";
import { showToast, toFixed } from "../../Constants/Utils";
import { setCookie, storageSetItem, getApiCall, postApiCall, returnFirstDegreeObjValue, showTimeZoneDate, currencyFormatter, getCookie, reloadWindow, textCapitalize, storageGetItem } from "gfdu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import exports from "../../images/new-export.svg"
import rightArr from "../../images/right-arr.svg"
import whiteArr from "../../images/white-arr.svg"
import collect from "../../images/collect-icon.svg"
import trans from "../../images/transaction-icon.svg"
import Loader from "../../components/Loader";
import { Select, Popover } from "antd";
let paramsId;
export default class DashboardDetails extends Component {
    constructor(props) {
        super(props);
        paramsId = this.props.match.params.id;
        this.state = {
            storeselectid: "",
            dashdayOption: "",
            store_DashboardStats: [],
            storelist: [],
            storeName: "",
            loading: true,
        };
    }
    componentDidMount() {
        this.Dashboard_details()
    }
    handledashdayOption(value) {
        this.setState(
            {
                dashdayOption: value,
            },
            () => {
                this.Dashboard_details();
            })
    }
    Dashboard_details = () => {
        var urlParams = new URLSearchParams(window.location.search);
        this.setState({ dashdayOption: this.state.dashdayOption ? this.state.dashdayOption : urlParams.get("date_option"), storeName: urlParams.get('name') }, () => {
            let queryParams = "";
            let { dashdayOption } = this.state;
            queryParams += dashdayOption === "" ? "" : dashdayOption === null ? "" : "date_option=" + dashdayOption;
            getApiCall(`dashboard/dashboard-stats/${paramsId}/?${queryParams}`, (response) => {
                if (response.success) {
                    let data = response.data;
                    this.setState({
                        dashboard_data: response.data, loading: false,
                        store_DashboardStats: data?.store_based_stats,
                    })
                }
                else {
                    this.setState({loading: false,})
                    showToast("error", "Dashboard Stats " + response.message);
                }
            })
        })
    }

    back = () => {
        this.props.history.push(`/dashboard`)
        // var urlParams = new URLSearchParams(window.location.search);
        // this.setState({ store_id: urlParams.get('store_id'), dashdayOption: urlParams.get("date_option") }, () => {
        //     let{dashdayOption}=this.state;
        //     this.props.history.push(`/dashboard?date_option=${dashdayOption}`)
        // })
    }
    viewTransaction = (upi_id, store_id, vpa_name) => {
        let { dashdayOption } = this.state;
        this.props.history.push(`/transaction?date_option=${dashdayOption}&upi_id=${upi_id}&store_id=${store_id}&name=${vpa_name}`)
    }
    render() {
        let { transactionlist, page, limit, storelist, filterDrawer, storeName, dashboard_data, store_DashboardStats } = this.state;
        const { Option } = Select;
        return (
            <>
                {this.state.loading && <Loader />}
                <div className="home-section">
                    <div className="home-content">
                        <div className="row">
                            <div className="col-xs-12 p-0">
                                <div className="col-xs-12 col-sm-12 col-md-12 p-l-0">
                                    <div className="col-xs-12 col-sm-8 col-md-8 m-t-6">
                                        <div className="card sub-transaction-card active">
                                            <div className="border_right" style={{ left: "33.33%", height: "55%", top: "30%" }}></div>
                                            <div className="border_right" style={{ left: "66.66%", height: "55%", top: "30%" }}></div>
                                            <div className="col-xs-12 p-0">
                                                <div className="card-header">
                                                    <div className="dashboard-card-title">{storeName ? (storeName === "" ? "No Data" : storeName) : "No Data"}</div>
                                                    <div className="filteroption  filter_drp" >
                                                        <Select name="Options" className="selectpicker"
                                                            value={this.state.dashdayOption}
                                                            id="Options"
                                                            onChange={(e) => this.handledashdayOption(e)}
                                                        >
                                                            <Option value="today">Today</Option>
                                                            <Option value="yesterday">Yesterday</Option>
                                                            <Option value="monthly">Monthly</Option>
                                                        </Select>

                                                    </div>
                                                </div>
                                                <div className="col-xs-4 p-0 ">
                                                    <div className="card-body ">
                                                        <div className="card-flex-btw">
                                                            <div className="card-icon-frame"><img alt="" src={collect} /></div>
                                                        </div>
                                                        <div className="card-title">UPI Collection</div>
                                                        <div className="trans-count "><span className="rupee">₹ </span>{toFixed(dashboard_data?.transaction_list?.transaction_volume === " " ? "0.00" : dashboard_data?.transaction_list?.transaction_volume)}</div>
                                                    </div>
                                                </div>
                                                <div className="col-xs-4 p-0">
                                                    <div className="card-body">
                                                        <div className="card-flex-btw">
                                                            <div className="card-icon-frame"><img alt="" src={trans} /></div>

                                                        </div>
                                                        <div className="card-title">No. of transaction</div>
                                                        <div className="trans-count">{dashboard_data?.transaction_list?.transaction_count === " " ? "0" : dashboard_data?.transaction_list?.transaction_count}</div>
                                                    </div>
                                                </div>
                                                <div className="col-xs-4 p-0">
                                                    <div className="card-body">
                                                        <div className="card-flex-btw">
                                                            <div className="card-icon-frame"><img alt="" src={trans} /></div>
                                                        </div>
                                                        <div className="card-title">Settlement</div>
                                                        <div className="trans-count"><span className="rupee">₹ </span>{toFixed(dashboard_data?.settlement_list?.settlement_volume === " " ? "0.00" : dashboard_data?.settlement_list?.settlement_volume)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-4 col-md-4 p-0 ">
                                        <div className="img-frame">
                                            <img alt="" src={exports} />
                                            <span className="export-btn">Export Report</span>
                                            <div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {store_DashboardStats?.map((storeData, l) => (
                            <div className="row" key={l}>
                                <div className="card-header">
                                    <div className="card-main-title">Counters</div>
                                    <span className="btn-ml back-btn" onClick={() => this.back()} ><i className="bx bx-chevron-left"></i> Back</span>
                                </div>
                                <div className="col-xs-12 p-0">
                                    {storeData?.vpa_stats.map((vpaStats, m) => (
                                        <div className="col-xs-6" key={m}>
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="new_card_top">
                                                        <div className="col-xs-10 p-0">
                                                            <div className="new_card_title">Counter Name</div>
                                                            <div className="new_card_desc">{vpaStats?.vpa_name === "" ? "-" : vpaStats?.vpa_name}</div>
                                                        </div>
                                                        <div className="col-xs-2 p-0 new_card_icon">
                                                            <img alt="" onClick={() => this.viewTransaction(vpaStats._id.upi_id, vpaStats._id.store_id, vpaStats.vpa_name)} src={rightArr} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="new_store_card_detail">
                                                    <div className="col-xs-6 p-0">
                                                        <div className="sub_card_title">Collection</div>
                                                        <div className="sub_card_desc"><span className="rupee">₹</span>{toFixed(vpaStats?.vpa_total_volume === "" ? "-" : vpaStats?.vpa_total_volume)}</div>
                                                    </div>
                                                    <div className="col-xs-6 p-0">
                                                        <div className="sub_card_title">No. of transaction</div>
                                                        <div className="sub_card_desc">{vpaStats?.vpa_total_count === "" ? "-" : vpaStats?.vpa_total_count}</div>
                                                    </div>
                                                    {/* <div className="col-xs-4 p-0">
                                                        <div className="sub_card_title">Settlement</div>
                                                        <div className="sub_card_desc">1,02,350</div>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                        )}
                    </div>
                </div>
            </>
        );
    }
}