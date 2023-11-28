import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import tick from "../../images/green-tick.svg"
import pending from "../../images/amountpending.svg"
import failed from "../../images/amountfailed.svg"
import { Link } from "react-router-dom";
import { reloadWindowToPath, setCookie, storageSetItem, getApiCall, postApiCall, returnFirstDegreeObjValue, showTimeZoneDate, currencyFormatter, getCookie, reloadWindow, removeCookie } from "gfdu";
import { textCapitalize } from "../../Constants/Utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../../Constants/Utils";
import Loader from "../../components/Loader";
import moment from "moment";
import axios from "axios";
import { DatePicker, Select, Drawer } from "antd";
import Pagination from "../../components/Pagination";
import trans from "../../images/transaction-icon.svg"
import collect from "../../images/collect-icon.svg"
import exports from "../../images/new-export.svg"
import transexports from "../../images/trans-export.svg"
import calendericon from "../../images/calenderIcon.svg"
import exporticon from "../../images/icon-export.svg"
import countericon from "../../images/icon-delete.svg"
var id_store = "";
export default class TransactionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarToggle: true,
            transactionlist: [],
            pageno: 1,
            limit: 15,
            total: 0,
            from: "",
            to: "",
            status: "",
            dateoption: "",
            search: "",
            loading: true,
            filterDrawer: false,
            paymode: "",
            recordsLength: [],
            storeselectid: "",
            storenameselected: "all",
            allList: "",
            dashdayOption: "today",
            isCalendar: true,
            store_id: "",
            upi_id: "",
            vpaName: "",
            storelist: []
        };
    }
    componentDidMount() {
        this.transactionlist(this.state.pageno);
        // let merchantobj = JSON.parse(getCookie('merchantobject'));
        // if(merchantobj.role==="store_subuser"){
        // }
        this.Dashboard_stats();
        this.storelist();
    }

    removeFilter() {
        console.log("selectstore", this.state.selectedStore);
        this.setState(
            {
                fromDate: "",
                from: "",
                toDate: "",
                to: "",
                status: "",
                dateoption: "",
                search: "",
                storeselectid: "",
                paymode: "",
                storenameselected: "all",
                isCalendar: true,
                selectedStore: ""

            },
            () => {

                this.transactionlist(this.state.pageno);
            })
        console.log("selectstore", this.state.selectedStore);

        // reloadWindow()
    }

    inputtext = (e) => {
        this.setState({ [e.target.name]: e.target.value },
            () => {
                this.transactionlist(this.state.pageno);
            })
    }
    handleOnDateChange(e) {
        console.log(e)
        var self = this;
        self.setState(
            {
                fromDate: e.length > 0 ? e[0] : "",
                from:
                    e.length > 0 ? moment(e[0]).startOf("day").format("YYYY/MM/DD") : "",
                toDate: e.length > 0 ? e[1] : "",
                to:
                    e.length > 0
                        ? moment(e[1]).startOf("day").format("YYYY/MM/DD") : ""
            },

            function () {
                self.transactionlist(this.state.pageno);
            }
        );
    }
    disabledDate(current) {
        return current > moment().endOf("day");
    }
    // storeselect = (event) => {
    //     console.log(event)
    //     if (event == "all") {
    //         this.setState({ storeselectid: "all" },
    //             () => {
    //                 this.transactionlist(this.state.pageno);
    //             })
    //     }
    //     else {
    //         this.setState({ storeselectid: JSON.parse(event).id, storenameselected: JSON.parse(event).valuename },
    //             () => {
    //                 this.transactionlist(this.state.pageno);
    //             })
    //     }
    // }
    handleOnStatusChange(value) {
        this.setState(
            {
                status: value,
            },
            () => {
                this.transactionlist(this.state.pageno);
            }
        );
    }

    paymentmode = (selectedvalue) => {
        this.setState(
            {
                paymode: selectedvalue,
            },
            () => {
                this.transactionlist(this.state.pageno);
            })
    }
    // handledateopt(value) {
    //     this.setState(
    //         {
    //             dateoption: value,
    //         },
    //         () => {
    //             this.transactionlist(this.state.pageno);
    //         })
    // }
    handledashdayOption(value) {
        this.setState(
            {
                dashdayOption: value,
            },
            () => {
                this.Dashboard_stats();
            })
    }

    transactionlist = (page) => {
        this.setState({
            pageno: page
        })
        let storeId = getCookie('storeId') == '' ? "" : getCookie('storeId') == 'null' ? "" : getCookie('storeId') == 'undefined' ? "" : getCookie('storeId');
        var urlParams = new URLSearchParams(window.location.search);
        console.log("trans-query", urlParams)
        this.setState({ dateoption: this.state.dateoption ? this.state.dateoption : urlParams.get("date_option"), upi_id: urlParams.get('upi_id'), store_id: urlParams.get('store_id'), vpaName: urlParams.get('name'), }, () => {
            let { from, to, status, dateoption, search, storeselectid, paymode, limit, store_id, upi_id, defaultDay } = this.state;
            let queryParams = "";
            queryParams += status === "" ? "" : status === null ? "" : "&status=" + status;
            queryParams += dateoption === "" ? "" : dateoption === null ? "" : "&date_option=" + dateoption;
            queryParams += from === "" ? "" : from === null ? "" : "&from_time=" + from;
            queryParams += to === "" ? "" : to === null ? "" : "&to_time=" + to;
            queryParams += search === "" ? "" : search === null ? "" : "&search_string=" + search ;
            queryParams += storeselectid === "" ? "" : storeselectid === null ? "" : storeselectid === "all" ? "" : "&store_id=" + storeselectid;
            queryParams += paymode === "" ? "" : paymode === null ? "" : "&mode=" + paymode;
            queryParams += upi_id === "" ? "" : upi_id === "undefined" ? "" : upi_id === null ? "" : "&upi_id=" + upi_id;
            queryParams += store_id === "" ? "" : store_id === "undefined" ? "" : store_id === null ? "" : "&store_id=" + store_id;
            queryParams += storeId === "" ? "" : storeId === "undefined" ? "" : storeId === null ? "" : "&store_id=" + storeId;
            getApiCall(`transaction/list/?page=${page}&limit=${limit}${queryParams}`,
                (response) => {
                    console.log(response)
                    if (response.success) {
                        this.setState({ transactionlist: response.data, loading: false, recordsLength: response.data.length })
                    }
                    else {
                        showToast("error", response.message);
                    }
                })
        })
    }

    Dashboard_stats = () => {
        let { dashdayOption } = this.state;
        let queryParams = "";
        queryParams += dashdayOption === "" ? "" : dashdayOption === null ? "" : "date_option=" + dashdayOption;
        getApiCall(`dashboard/dashboard-stats?${queryParams}`, (response) => {
            if (response.success) {
                this.setState({ dashboard_data: response.data, loading: false })
            }
            else {
                showToast("error", "Dashboard Stats " + response.message);
            }
        })
    }
    filterDrawer = () => {
        this.setState({ filterDrawer: !this.state.filterDrawer })
    }
    exportTransactions = () => {
        var self = this;

        let { from, to, status, dateoption, search, storeselectid, paymode } = self.state;
        let queryParams = "";

        queryParams += status === "" ? "" : status === null ? "" : "&status=" + status;
        queryParams += dateoption === "" ? "" : dateoption === null ? "" : "&date_option=" + dateoption;
        queryParams += from === "" ? "" : from === null ? "" : "&from_time=" + from;
        queryParams += to === "" ? "" : to === null ? "" : "&to_time=" + to;
        queryParams += search === "" ? "" : search === null ? "" : "&search_string=" + search;
        queryParams += storeselectid === "" ? "" : storeselectid === null ? "" : "&store_id=" + storeselectid;
        queryParams += paymode === "" ? "" : paymode === null ? "" : "&mode=" + paymode;
        if (this.state.transactionlist?.length > 0 === true) {
            axios({
                url:
                    // "https://ippouat.ippopay.com/api/v1/merchant-panel/transaction/list?export=true" +
                    "https://storeapi.ippopay.com/api/v1/merchant-panel/transaction/list?export=true" +
                    queryParams,
                method: "GET",
                responseType: "blob",
                headers: {
                    "Content-Tye": "application/json",
                    "Authorization": "Bearer " + getCookie('merchant_token')
                }
            }).then((response) => {
                var size = new Blob([response.data]).size;
                if (size !== 0) {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("target", "_blank");
                    link.setAttribute("download", "Transaction-Reports.csv");
                    document.body.appendChild(link);
                    link.click();
                    this.setState({ loading: false });
                } else {
                    this.setState({ loading: false });
                    showToast("error", "There is no transaction report for this merchant");
                }
            });
        }
        else {
            showToast("error", "There is no transaction data");
        }
    }
    handleDay = (e) => {
        this.setState({
            ...this.state,
            dateoption: e,
            isCalendar: true,
            fromDate: "",
            from: "",
            toDate: "",
            to: "",
        },
            () => {
                this.transactionlist(this.state.pageno);
            })
        console.log("handleDay", this.state.dateoption);
    }
    handleCalendar = () => {
        this.setState({
            ...this.state,
            isCalendar: false,
            dateoption: ""
        },
            () => {
                this.transactionlist(this.state.pageno);
            })
    }
    removeParamsName = () => {
        reloadWindowToPath(window.location.href.split("?")[0]);
    }
    storelist = () => {
        ApiGateWay.get(`store/list`, (response) => {
            this.setState({ storelist: response.data, loading: false, })
            console.log("storelist", response);
        })
    }
    storeSelect = (event) => {
        console.log("storeselect", event);
        this.setState({ selectedStore: event }, () => {
            this.transactionlist(this.state.pageno);
        })
        setCookie('storeId', event)
    }
    back = () => {
        var urlParams = new URLSearchParams(window.location.search);
        this.setState({ store_id: urlParams.get('store_id'), dashdayOption: urlParams.get("date_option") }, () => {
            let { store_id, dashdayOption } = this.state;
            this.props.history.push(`/dashboard/details/${store_id}?date_option=${dashdayOption}`)
        })
    }
    render() {
        const { Option } = Select;
        let { transactionlist, page, limit, storelist, filterDrawer, storenameselected, status, paymode, storeselectid, dashboard_data, vpaName } = this.state;
        const { RangePicker } = DatePicker;
        console.log(this.state)
        console.log(this.state.recordsLength);
        var urlParams = new URLSearchParams(this.props.searchParamsList);
        id_store = urlParams.get('store_id');
        if (id_store) {
            setCookie('storeId', id_store)
        }
        let merchantobj = JSON.parse(getCookie('merchantobject'));
        return (
            <>
                {this.state.loading && <Loader />}
                <div className="home-section">
                    <div className="home-content">
                        {merchantobj.role === "store_subuser" ?
                            <div className="row">
                                <div className="col-xs-12 p-0">
                                    <div className="col-xs-12 col-sm-12 col-md-12 p-l-0">
                                        <div className="col-xs-12 col-sm-8 col-md-8 m-t-6">
                                            <div className="card sub-transaction-card active">
                                                <div className="border_right"></div>
                                                <div className="col-xs-12 p-0">
                                                    <div className="col-xs-6 p-0 ">
                                                        <div className="card-body ">
                                                            <div className="card-flex-btw">
                                                                <div className="card-icon-frame"><img src={collect} /></div>
                                                            </div>
                                                            <div className="card-title">UPI Collection</div>
                                                            <div className="trans-count "><span className="rupee">₹ </span>{(dashboard_data?.transaction_list?.transaction_volume === "" ? "0.00" : dashboard_data?.transaction_list?.transaction_volume)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-6 p-0">
                                                        <div className="card-body">
                                                            <div className="card-flex-btw">
                                                                <div className="card-icon-frame"><img src={trans} /></div>
                                                                <div className="filteroption  filter_drp" >
                                                                    <Select name="Options" className="selectpicker"
                                                                        value={this.state.dashdayOption}
                                                                        id="Options"
                                                                        onChange={(e) => this.handledashdayOption(e)}
                                                                    >
                                                                        <Option value="today">Today</Option>
                                                                        <Option value="yesterday">Yesterday</Option>
                                                                    </Select>

                                                                </div>
                                                            </div>
                                                            <div className="card-title">No. of transaction</div>
                                                            <div className="trans-count">{dashboard_data?.transaction_list?.transaction_count === "" ? "0" : dashboard_data?.transaction_list?.transaction_count}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-sm-4 col-md-4 p-0 ">
                                            <div className="img-frame" style={{ height: "145px" }} onClick={() => this.exportTransactions()}>
                                                <img src={transexports} style={{ height: "145px" }} />
                                                <span className="export-btn" style={{ bottom: "7px" }}>Export Report</span>
                                                <div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            null
                        }
                        <div className="row">
                            <div className="col-xs-12">
                                {merchantobj.role === "store_subuser" ?
                                    <div className="table-header">
                                        <div className="card-main-title">Transaction</div>
                                    </div>
                                    :
                                    <>
                                        <div className="overall_flex" style={{ marginTop: "5px" }}>
                                            {/* <div className="dashboard-card-title">All Branches</div> */}
                                            <div className="filteroption  filter_drp trans_drp " >
                                                {/* {getCookie('storeId')} */}
                                                <Select name="storeList" className="selectpicker"
                                                    style={{ width: 200 }}
                                                    onSelect={this.storeSelect}
                                                    showSearch
                                                    defaultValue={id_store ? id_store : getCookie('storeId') === 'null' ? "" : getCookie('storeId') === 'undefined' ? "" : getCookie('storeId')}
                                                    notFoundContent="No Data"
                                                    placeholder="Search Store"
                                                    filterOption={(input, option) =>
                                                        (option?.id ?? '').toLowerCase().includes(input.toLowerCase())}
                                                >
                                                    <Option value="" >All Branches</Option>
                                                    {storelist?.map((storeList, i) =>
                                                        <Option key={i} value={storeList?.store_id}
                                                            id={storeList?.name?.full === "" ? storeList?.name?.store : storeList?.name?.full}
                                                        >{storeList?.name?.full === "" ? storeList?.name?.store : storeList?.name?.full}</Option>
                                                    )}
                                                </Select>
                                            </div>
                                            <span style={{ marginLeft: "12px" }} className="btn-ml store-filter-btn btn_active" onClick={() => this.exportTransactions()} ><img src={exporticon} /> Export Report</span>
                                        </div>
                                        {vpaName &&
                                            <div className="overall_flex">
                                                <div className="counter_title">Counters :<span className="counter_name" onClick={() => this.removeParamsName()}>{vpaName} <img src={countericon} /> </span></div>
                                                <span className="btn-ml back-btn" onClick={() => this.back()} ><i className="bx bx-chevron-left"></i> Back</span>
                                            </div>}
                                    </>
                                }
                                <div className="table-header justi_start">
                                    <div className="filter-search">
                                        <div className="left-side-filter">
                                            {/* dateoption */}
                                            {console.log("AsdsaD 410", this.state.dateoption)}
                                            <span className={this.state.dateoption === "" || this.state.dateoption === null ? " btn-ml store-filter-btn btn_active" : " btn-ml store-filter-btn"} onClick={() => this.handleDay("")} >All</span>
                                            <span onClick={() => this.handleDay("today")} className={this.state.dateoption === "today" ? " btn-ml store-filter-btn btn_active" : " btn-ml store-filter-btn"}>Today</span>
                                            <span className={this.state.dateoption === "yesterday" ? " btn-ml store-filter-btn btn_active" : " btn-ml store-filter-btn"} onClick={() => this.handleDay("yesterday")}>Yesterday</span>
                                            <span className={this.state.dateoption === "monthly" ? " btn-ml store-filter-btn btn_active" : " btn-ml store-filter-btn"} onClick={() => this.handleDay("monthly")}>Monthly</span>
                                            <div className=" btn-ml " style={{ display: "flex" }}>
                                                {this.state.isCalendar ?
                                                    <span className="btn-ml store-filter-btn" onClick={() => this.handleCalendar()}><img style={{ marginRight: "5px" }} src={calendericon} />Custom Date</span>
                                                    : <div className="datepicker boxradius">
                                                        <RangePicker
                                                            separator={"-"}
                                                            onChange={(e) => this.handleOnDateChange(e)}
                                                            format="DD/MM/YYYY"
                                                            animateYearScrolling={false}
                                                            disabledDate={this.disabledDate}
                                                            value={[this.state.fromDate, this.state.toDate]}
                                                            allowClear={true}
                                                        />
                                                    </div>}
                                            </div>
                                            <div className="filterstatus boxradius btn-ml">
                                                <Select placeholder="Select Status"
                                                    value={status}
                                                    onChange={(e) => this.handleOnStatusChange(e)}
                                                >
                                                    <Option value="">All Status</Option>
                                                    <Option value="pending">Pending</Option>
                                                    <Option value="success">Success</Option>
                                                    <Option value="failure">Failure</Option>
                                                </Select>
                                            </div>
                                            <a className="btn btn-default card_btn btn-ml" onClick={e => this.removeFilter(e)}>Reset</a>
                                        </div>
                                        <div className="right-side-filter">
                                            <div className="search-box">
                                                <button className="btn"><i className="fe fe-search" aria-hidden="true"></i></button>
                                                <input className="form-control" placeholder="Search" type="text" name="search" value={this.state.search} onChange={(e) => this.inputtext(e)} />
                                            </div>
                                            {/* {!vpaName && (merchantobj.role !== "store_subuser") ? <span style={{ marginLeft: "12px" }} className="btn-ml store-filter-btn btn_active" onClick={() => this.exportTransactions()} ><img src={exporticon} /> Export Report</span> : null} */}
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table_transaction">
                                                <thead>
                                                    <tr>
                                                        <th>S.No</th>
                                                        <th>Date</th>
                                                        <th style={{ textAlign: "center" }}>Transaction id</th>
                                                        <th>Type</th>
                                                        <th>Store Name</th>
                                                        {/* <th>VPA Name</th> */}
                                                        <th>Customer Name</th>
                                                        <th>Amount</th>
                                                        <th style={{ textAlign: "center" }}>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {transactionlist.length > 0 ? (
                                                        transactionlist.map((trans, i) => (
                                                            <tr key={i}>
                                                                <td>{this.state.pageno * limit - limit + (i + 1)}</td>
                                                                <td>
                                                                    {showTimeZoneDate(trans?.createdAt)}
                                                                </td>
                                                                <td style={{ textAlign: "center" }}><span className="table-data">{trans.trans_id}</span></td>
                                                                <td><span className="table-data">{textCapitalize(trans?.payment?.mode)}</span></td>
                                                                <td><span className="table-data">{trans?.store?.name === "" ? "-" : trans?.store?.name}</span></td>
                                                                <td><span className="table-data">{trans?.customer?.name?.full === "" ? "-" : trans?.customer?.name?.full}</span></td>
                                                                <td><span className="table-data rupee">{currencyFormatter(trans.grand_total, "INR")}</span></td>
                                                                <td style={{ textAlign: "center" }}>
                                                                    <span className="img-tooltip" style={{ cursor: "pointer" }}>
                                                                        {trans.status === "success" ? (<><img src={tick} /><span className="tooltiptext text-success bg-success-transparent">success</span></>) : trans.status === "pending" ? (<><img src={pending} /><span className="tooltiptext text-warning bg-warning-transparent">pending</span></>) : (<><img src={failed} /><span className="tooltiptext text-danger bg-danger-transparent">failed</span></>)}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <Link to={`/transaction/details/${trans.trans_id}`} >
                                                                        <span className="view-button">view</span>
                                                                    </Link>
                                                                </td>
                                                            </tr>

                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td style={{ textAlign: "center" }} colSpan="10">No Transactions Found</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                            <Pagination handle={this.transactionlist} list={this.state.recordsLength}></Pagination>
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


