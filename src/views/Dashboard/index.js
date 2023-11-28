import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import collect from "../../images/collect-icon.svg"
import settle from "../../images/settlement-icon.svg"
import trans from "../../images/transaction-icon.svg"
import chart from "../../images/chart-img.svg"
import tick from "../../images/green-tick.svg"
import { Link } from "react-router-dom";
import { showToast, toFixed } from "../../Constants/Utils";
import { setCookie, storageSetItem, getApiCall, postApiCall, returnFirstDegreeObjValue, showTimeZoneDate, currencyFormatter, getCookie, textCapitalize } from "gfdu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pending from "../../images/amountpending.svg"
import failed from "../../images/amountfailed.svg"
import exports from "../../images/Export.svg"
import rightArr from "../../images/right-arr.svg"
import whiteArr from "../../images/white-arr.svg"

import { Select } from "antd";
export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarToggle: true,
            storeselectid: "",
            page: 1,
            limit: 10,
            total: 0,
            storenameselected: "all",
            dashdayOption: "monthly",
            store_DashboardStats: [],
            storeView: true,
            storeOne: false,
            storeTwo: false,
            storeThree: false,
            storeFour: false,
            storeOne_view: false,
            storeTwo_view: false,
            storeThree_view: false,
            storeFour_view: false,
            storeAllList:true,
            storeListDetails:false,
            storesDrp:""
        };
    }
    componentDidMount() {
        this.transactionlist()
        this.storelist();
        this.Dashboard_stats()
    }

    handledashdayOption(value) {
        this.setState(
            {
                dashdayOption: value,
            },
            () => {
                this.Dashboard_stats();
            })
    }
    Dashboard_stats = () => {
        let { dashdayOption } = this.state;
        let queryParams = "";
        queryParams += dashdayOption === "" ? "" : dashdayOption === null ? "" : "date_option=" + dashdayOption;
        getApiCall(`dashboard/dashboard-stats?${queryParams}`, (response) => {
            if (response.success) {
                let data = response.data;
                this.setState({
                    dashboard_data: response.data, loading: false,
                    store_DashboardStats: data?.store_based_stats,
                })
            }
            // else {
            //     showToast("error","Dashboard Stats "+ response.message);
            // }
        })
    }

    viewShopDetails = (id) => {
        let { dashdayOption, storeView } = this.state;
        this.setState({
            ...this.state,
            storeView: false
        })
        let queryParams = "";
        queryParams += dashdayOption === "" ? "" : dashdayOption === null ? "" : "date_option=" + dashdayOption;
        getApiCall(`dashboard/dashboard-stats/${id}?${queryParams}`, (response) => {
            if (response.success) {
                let data = response.data;
                this.setState({
                    dashboard_data: response.data, loading: false,
                    store_DashboardStats: data?.store_based_stats,
                })
            }
            // else {
            //     showToast("error","Dashboard Stats "+ response.message);
            // }
        })

    }


    transactionlist = () => {
        let { from, to, status, dateoption, search, storeselectid, paymode, page, limit } = this.state;
        let queryParams = "";
        queryParams += storeselectid === "" ? "" : storeselectid === null ? "" : storeselectid === "all" ? "" : "&store_id=" + storeselectid;

        getApiCall(`transaction/list?page=${page}&limit=${limit}${queryParams}`,
            (response) => {
                // console.log(response)
                if (response.success) {
                    this.setState({ transactionlist: response.data, loading: false })
                }
                else {
                    showToast("error", response.message);
                }
            })
    }

    // Dashboard_stats = () => {
    //     getApiCall(`dashboard/dashboard-stats`, (response) => {
    //         if (response.success) {
    //             this.setState({ dashboard_data: response.data, loading: false })
    //         }
    //         // else {
    //         //     showToast("error","Dashboard Stats "+ response.message);
    //         // }
    //     })
    // }


    storelist = () => {
        ApiGateWay.get(`store/list`, (response) => {
            this.setState({ storelist: response.data, loading: false })
        })
    }
    storeselect = (event) => {
        console.log(event)
        if (event == "all") {
            this.setState({ storeselectid: "all" },
                () => {
                    this.transactionlist(this.state.pageno);
                })
        }
        else {
            this.setState({ storeselectid: JSON.parse(event).id, storenameselected: JSON.parse(event).valuename },
                () => {
                    this.transactionlist(this.state.pageno);
                })
        }
    }
     onChange(event) {
        [event.target.name]=event.target.value
     }
    goBackToStore = () => {
        this.setState({storeAllList:true,storeListDetails:false})
    }
    handleStoreOne = (a,b,c,d) => {
        this.setState({
            [a]:true,
            [b]:false,
            [c]:false,
            [d]:false,
            [a+'_view']:true,
            [b+'_view']:false,
            [c+'_view']:false,
            [d+'_view']:false,
            storeAllList:false,
            storeListDetails:true
        })
    }


    render() {

        let { transactionlist, page, limit, storelist, filterDrawer, storenameselected, dashboard_data, storesDrp,store_DashboardStats,storeOne } = this.state;
        const { Option } = Select;
      
        let merchantobj = JSON.parse(getCookie('merchantobject'));
        return (
            <>

                <div className="home-section">
                    <div className="home-content">
                        <div className="row">
                            <div className="col-xs-12 p-0">
                                <div className="col-xs-12 col-sm-12 col-md-12 p-l-0">
                                    <div className="col-xs-12 col-sm-8 col-md-12 m-t-6">
                                        <div className="card sub-transaction-card active">
                                            <div
                                                className="border_right"
                                                style={{ left: "31%", height: "55%", top: "30%" }}
                                            ></div>
                                            <div
                                                className="border_right"
                                                style={{ left: "64.3%", height: "55%", top: "30%" }}
                                            ></div>
                                            <div className="col-xs-12 p-0">
                                                <div className="card-header">
                                                    {/* <div className="dashboard-card-title">All Branches</div> */}
                                                    
                                                    <div className="filteroption  filter_drp width_drp ">
                                                        <Select
                                                            name="storeList"
                                                            className="selectpicker"
                                                            style={{ width: 200 }}
                                                            showSearch
                                                            notFoundContent="No Data"
                                                            placeholder="Search Store"
                                                            value={storesDrp}
                                                            onSelect={this.onChange}
                                                           
                                                        >
                                                            <Option value="">All Stores</Option>
                                                            <Option value="store1">Vel Stores T.nagar</Option>
                                                            <Option value="store2">Vel Stores Velachery</Option>
                                                            <Option value="store3">Vel Stores Anna Nagar</Option>
                                                            <Option value="store4">Vel Stores Vadapalani</Option>
                                                        </Select>
                                                    </div>
                                                    <div className="filteroption  filter_drp">
                                                        <Select
                                                            name="Options"
                                                            className="selectpicker"
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
                                                            <div className="card-icon-frame">
                                                                <img alt="" src={collect} />
                                                            </div>
                                                        </div>
                                                        <div className="card-title">UPI Collection</div>
                                                        <div className="trans-count ">
                                                            <span className="rupee">₹ </span>
                                                            {toFixed(
                                                                dashboard_data?.transaction_list
                                                                    ?.transaction_volume === " "
                                                                    ? "0.00"
                                                                    : dashboard_data?.transaction_list
                                                                        ?.transaction_volume
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xs-4 p-0">
                                                    <div className="card-body">
                                                        <div className="card-flex-btw">
                                                            <div className="card-icon-frame">
                                                                <img alt="" src={trans} />
                                                            </div>
                                                        </div>
                                                        <div className="card-title">No. of transaction</div>
                                                        <div className="trans-count">
                                                            {dashboard_data?.transaction_list
                                                                ?.transaction_count === " "
                                                                ? "0"
                                                                : dashboard_data?.transaction_list
                                                                    ?.transaction_count}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xs-4 p-0">
                                                    <div className="card-body">
                                                        <div className="card-flex-btw">
                                                            <div className="card-icon-frame">
                                                                <img alt="" src={trans} />
                                                            </div>
                                                        </div>
                                                        <div className="card-title">Settlement</div>
                                                        <div className="trans-count">
                                                            <span className="rupee">₹ </span>
                                                            {toFixed(
                                                                dashboard_data?.settlement_list
                                                                    ?.settlement_volume === " "
                                                                    ? "0.00"
                                                                    : dashboard_data?.settlement_list
                                                                        ?.settlement_volume
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="col-xs-12 col-sm-4 col-md-4 p-0 ">
                                        <div className="img-frame">
                                            <img src={exports} />
                                            <span className="export-btn">Export Report</span>
                                            <div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        {this.state.storeAllList ?
                        <div className="row">
                            <div className="col-xs-12 p-0 main_merchant">
                                <div className="col-xs-6 p-r-8">
                                    <div className="new_store_card" style={{ background: "#fff" }}>
                                        <div className="new_card_top">
                                            <div className="col-xs-10 p-0">
                                                <div className="new_card_title">Store Name</div>
                                                <div className="new_card_desc">Vel Stores T.nagar</div>
                                            </div>
                                            <div className="col-xs-2 p-0 new_card_icon" onClick={() => this.handleStoreOne('storeOne','storeTwo','storeThree','storeFour')}>
                                                <img src={rightArr}  />
                                            </div>
                                        </div>
                                        <div className="new_sub_card" style={{ background: "#DAEBFA" }}>
                                            <div className="col-xs-4 p-0">
                                                <div className="sub_card_title">Collection</div>
                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                            </div>
                                            <div className="col-xs-4 p-0">
                                                <div className="sub_card_title">No. of transaction</div>
                                                <div className="sub_card_desc">1,02,350</div>
                                            </div>
                                            <div className="col-xs-4 p-0">
                                                <div className="sub_card_title">Total Settlement</div>
                                                <div className="sub_card_desc"><span className="rupee">₹</span>0</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-6 p-r-8">
                                    <div className="new_store_card" style={{ background: "#fff" }}>
                                        <div className="new_card_top">
                                            <div className="col-xs-10 p-0">
                                                <div className="new_card_title">Store Name</div>
                                                <div className="new_card_desc">Vel Stores Velachery</div>
                                            </div>
                                            <div className="col-xs-2 p-0 new_card_icon"  onClick={() => this.handleStoreOne('storeTwo','storeOne','storeThree','storeFour')}>
                                                <img src={rightArr} />
                                            </div>
                                        </div>
                                        <div className="new_sub_card" style={{ background: "#DAEBFA" }}>
                                            <div className="col-xs-4 p-0">
                                                <div className="sub_card_title">Collection</div>
                                                <div className="sub_card_desc"><span className="rupee">₹</span>65,000</div>
                                            </div>
                                            <div className="col-xs-4 p-0">
                                                <div className="sub_card_title">No. of transaction</div>
                                                <div className="sub_card_desc">1,02,350</div>
                                            </div>
                                            <div className="col-xs-4 p-0">
                                                <div className="sub_card_title">Total Settlement</div>
                                                <div className="sub_card_desc"><span className="rupee">₹</span>0</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-6 p-r-8">
                                    <div className="new_store_card" style={{ background: "#fff" }}>
                                        <div className="new_card_top">
                                            <div className="col-xs-10 p-0">
                                                <div className="new_card_title">Store Name</div>
                                                <div className="new_card_desc">Vel Stores Anna Nagar</div>
                                            </div>
                                            <div className="col-xs-2 p-0 new_card_icon"  onClick={() => this.handleStoreOne('storeThree','storeTwo','storeOne','storeFour')}>
                                                <img src={rightArr}  />
                                            </div>
                                        </div>
                                        <div className="new_sub_card" style={{ background: "#DAEBFA" }}>
                                            <div className="col-xs-4 p-0">
                                                <div className="sub_card_title">Collection</div>
                                                <div className="sub_card_desc"><span className="rupee">₹</span>35,000</div>
                                            </div>
                                            <div className="col-xs-4 p-0">
                                                <div className="sub_card_title">No. of transaction</div>
                                                <div className="sub_card_desc">82,350</div>
                                            </div>
                                            <div className="col-xs-4 p-0">
                                                <div className="sub_card_title">Total Settlement</div>
                                                <div className="sub_card_desc"><span className="rupee">₹</span>0</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-6 p-r-8">
                                    <div className="new_store_card" style={{ background: "#fff" }}>
                                        <div className="new_card_top">
                                            <div className="col-xs-10 p-0">
                                                <div className="new_card_title">Store Name</div>
                                                <div className="new_card_desc">Vel Stores Vadapalani</div>
                                            </div>
                                            <div className="col-xs-2 p-0 new_card_icon" onClick={() => this.handleStoreOne('storeFour','storeTwo','storeOne','storeThree')}>
                                                <img src={rightArr} />
                                            </div>
                                        </div>
                                        <div className="new_sub_card" style={{ background: "#DAEBFA" }}>
                                            <div className="col-xs-4 p-0">
                                                <div className="sub_card_title">Collection</div>
                                                <div className="sub_card_desc"><span className="rupee">₹</span>1,25,000</div>
                                            </div>
                                            <div className="col-xs-4 p-0">
                                                <div className="sub_card_title">No. of transaction</div>
                                                <div className="sub_card_desc">2,02,350</div>
                                            </div>
                                            <div className="col-xs-4 p-0">
                                                <div className="sub_card_title">Total Settlement</div>
                                                <div className="sub_card_desc"><span className="rupee">₹</span>0</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="card-header"><div className="card-main-title">Floors</div><span className="btn-ml back-btn" onClick={this.goBackToStore}><i className="bx bx-chevron-left" /> Back</span></div>
                        }
                        {this.state.storeListDetails ?
                            this.state.storeOne_view ?
                            <>
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="card">
                                        <div className="col-xs-12 p-0">
                                            <div className="card-header">
                                                <div className="card-top">
                                                    <div className="card_heading">Floor Name</div>
                                                    <div className="card_desc">Kids Collection</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total Upi collections</div>
                                                    <div className="card_desc"><span className="rupee">₹</span>50,000</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total settlemet</div>
                                                    <div className="card_desc"><span className="rupee">₹</span>1,02,350</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">No. of sub merchant</div>
                                                    <div className="card_desc">05</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">No. of Transaction</div>
                                                    <div className="card_desc">1,00,530</div>
                                                </div>
                                                <div className="card-top">
                                                    <img style={{ cursor: "pointer" }} src={rightArr} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div class="scrolling-wrapper-flexbox">
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span> 45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="card">
                                        <div className="col-xs-12 p-0">
                                            <div className="card-header">
                                                <div className="card-top">
                                                    <div className="card_heading">Floor Name</div>
                                                    <div className="card_desc">Womens Section</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total Counter</div>
                                                    <div className="card_desc"><span className="rupee">₹</span>50,000</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">No. of transaction</div>
                                                    <div className="card_desc">1,02,350</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total Counter</div>
                                                    <div className="card_desc"><span className="rupee">₹</span>45,000</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total Counter</div>
                                                    <div className="card_desc">05</div>
                                                </div>
                                                <div className="card-top">
                                                    <img style={{ cursor: "pointer" }} src={rightArr} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div class="scrolling-wrapper-flexbox">
                                                <div className="merchant-card-box" style={{ width: "50%" }}>
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Counter Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">Settlement</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box" style={{ width: "50%" }} >
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Counter Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">Settlement</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="card">
                                        <div className="col-xs-12 p-0">
                                            <div className="card-header">
                                                <div className="card-top">
                                                    <div className="card_heading">Floor Name</div>
                                                    <div className="card_desc">Men's Collection</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total Upi collections</div>
                                                    <div className="card_desc"><span className="rupee">₹</span>80,000</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total settlemet</div>
                                                    <div className="card_desc"><span className="rupee">₹</span>1,52,650</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">No. of sub merchant</div>
                                                    <div className="card_desc">05</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">No. of Transaction</div>
                                                    <div className="card_desc">1,00,330</div>
                                                </div>
                                                <div className="card-top">
                                                    <img style={{ cursor: "pointer" }} src={rightArr} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div class="scrolling-wrapper-flexbox">
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </>
                            :
                            this.state.storeTwo_view ?
                            <>
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="card">
                                        <div className="col-xs-12 p-0">
                                            <div className="card-header">
                                                <div className="card-top">
                                                    <div className="card_heading">Floor Name</div>
                                                    <div className="card_desc">Sarees Section</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total Counter</div>
                                                    <div className="card_desc"><span className="rupee">₹</span>50,000</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">No. of transaction</div>
                                                    <div className="card_desc">1,02,350</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total Counter</div>
                                                    <div className="card_desc"><span className="rupee">₹</span>45,000</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total Counter</div>
                                                    <div className="card_desc">05</div>
                                                </div>
                                                <div className="card-top">
                                                    <img style={{ cursor: "pointer" }} src={rightArr} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div class="scrolling-wrapper-flexbox">
                                                <div className="merchant-card-box" style={{ width: "50%" }}>
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Counter Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">Settlement</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box" style={{ width: "50%" }} >
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Counter Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">Settlement</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="card">
                                        <div className="col-xs-12 p-0">
                                            <div className="card-header">
                                                <div className="card-top">
                                                    <div className="card_heading">Floor Name</div>
                                                    <div className="card_desc">Men's Collection</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total Upi collections</div>
                                                    <div className="card_desc"><span className="rupee">₹</span>80,000</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total settlemet</div>
                                                    <div className="card_desc"><span className="rupee">₹</span>1,52,650</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">No. of sub merchant</div>
                                                    <div className="card_desc">05</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">No. of Transaction</div>
                                                    <div className="card_desc">1,00,330</div>
                                                </div>
                                                <div className="card-top">
                                                    <img style={{ cursor: "pointer" }} src={rightArr} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div class="scrolling-wrapper-flexbox">
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </>
                            :
                            this.state.storeThree_view ?
                            <>
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="card">
                                        <div className="col-xs-12 p-0">
                                            <div className="card-header">
                                                <div className="card-top">
                                                    <div className="card_heading">Floor Name</div>
                                                    <div className="card_desc">Kids Collection</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total Upi collections</div>
                                                    <div className="card_desc"><span className="rupee">₹</span>50,000</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total settlemet</div>
                                                    <div className="card_desc"><span className="rupee">₹</span>1,02,350</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">No. of sub merchant</div>
                                                    <div className="card_desc">05</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">No. of Transaction</div>
                                                    <div className="card_desc">1,00,530</div>
                                                </div>
                                                <div className="card-top">
                                                    <img style={{ cursor: "pointer" }} src={rightArr} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div class="scrolling-wrapper-flexbox">
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span> 45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="card">
                                        <div className="col-xs-12 p-0">
                                            <div className="card-header">
                                                <div className="card-top">
                                                    <div className="card_heading">Floor Name</div>
                                                    <div className="card_desc">Womens Section</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total Counter</div>
                                                    <div className="card_desc"><span className="rupee">₹</span>50,000</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">No. of transaction</div>
                                                    <div className="card_desc">1,02,350</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total Counter</div>
                                                    <div className="card_desc"><span className="rupee">₹</span>45,000</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total Counter</div>
                                                    <div className="card_desc">05</div>
                                                </div>
                                                <div className="card-top">
                                                    <img style={{ cursor: "pointer" }} src={rightArr} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div class="scrolling-wrapper-flexbox">
                                                <div className="merchant-card-box" style={{ width: "50%" }}>
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Counter Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">Settlement</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box" style={{ width: "50%" }} >
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Counter Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">Settlement</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="card">
                                        <div className="col-xs-12 p-0">
                                            <div className="card-header">
                                                <div className="card-top">
                                                    <div className="card_heading">Floor Name</div>
                                                    <div className="card_desc">Men's Collection</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total Upi collections</div>
                                                    <div className="card_desc"><span className="rupee">₹</span>80,000</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total settlemet</div>
                                                    <div className="card_desc"><span className="rupee">₹</span>1,52,650</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">No. of sub merchant</div>
                                                    <div className="card_desc">05</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">No. of Transaction</div>
                                                    <div className="card_desc">1,00,330</div>
                                                </div>
                                                <div className="card-top">
                                                    <img style={{ cursor: "pointer" }} src={rightArr} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div class="scrolling-wrapper-flexbox">
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </>
                            :
                            this.state.storeFour_view ?
                            <>
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="card">
                                        <div className="col-xs-12 p-0">
                                            <div className="card-header">
                                                <div className="card-top">
                                                    <div className="card_heading">Floor Name</div>
                                                    <div className="card_desc">Sarees Section</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total Counter</div>
                                                    <div className="card_desc"><span className="rupee">₹</span>50,000</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">No. of transaction</div>
                                                    <div className="card_desc">1,02,350</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total Counter</div>
                                                    <div className="card_desc"><span className="rupee">₹</span>45,000</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total Counter</div>
                                                    <div className="card_desc">05</div>
                                                </div>
                                                <div className="card-top">
                                                    <img style={{ cursor: "pointer" }} src={rightArr} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div class="scrolling-wrapper-flexbox">
                                                <div className="merchant-card-box" style={{ width: "50%" }}>
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Counter Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">Settlement</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box" style={{ width: "50%" }} >
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Counter Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                            <div className="col-xs-4 p-0">
                                                                <div className="sub_card_title">Settlement</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="card">
                                        <div className="col-xs-12 p-0">
                                            <div className="card-header">
                                                <div className="card-top">
                                                    <div className="card_heading">Floor Name</div>
                                                    <div className="card_desc">Men's Collection</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total Upi collections</div>
                                                    <div className="card_desc"><span className="rupee">₹</span>80,000</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">Total settlemet</div>
                                                    <div className="card_desc"><span className="rupee">₹</span>1,52,650</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">No. of sub merchant</div>
                                                    <div className="card_desc">05</div>
                                                </div>
                                                <div className="card-top">
                                                    <div className="card_heading">No. of Transaction</div>
                                                    <div className="card_desc">1,00,330</div>
                                                </div>
                                                <div className="card-top">
                                                    <img style={{ cursor: "pointer" }} src={rightArr} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div class="scrolling-wrapper-flexbox">
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="merchant-card-box">
                                                    <div className="new_store_card">
                                                        <div className="new_card_top">
                                                            <div className="col-xs-10 p-0">
                                                                <div className="new_card_title">Sub Merchant Name</div>
                                                                <div className="new_card_desc">SSPorur_123</div>
                                                            </div>
                                                            <div className="col-xs-2 p-0 new_card_icon">
                                                                <img src={whiteArr} />
                                                            </div>
                                                        </div>
                                                        <div className="new_sub_card">
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">Collection</div>
                                                                <div className="sub_card_desc"><span className="rupee">₹</span>45,000</div>
                                                            </div>
                                                            <div className="col-xs-6 p-0">
                                                                <div className="sub_card_title">No. of transaction</div>
                                                                <div className="sub_card_desc">1,02,350</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </>
                            :
                            null
                        :
                        null
                        }
                    </div>
                </div>
            </>
        );
    }
}
