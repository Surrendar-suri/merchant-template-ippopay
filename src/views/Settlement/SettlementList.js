import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import tick from "../../images/green-tick.svg"
import { Link } from "react-router-dom";
import { data } from "jquery";
import createdicon from "../../images/created.svg"
import settledicon from "../../images/settled.svg"
import Loader from "../../components/Loader";
import { Button } from 'antd';
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../../Constants/Utils";
import { DatePicker, Select, Drawer } from "antd";
import moment from "moment";
import Pagination from "../../components/Pagination";
import { getApiCall, returnFirstDegreeObjValue, showTimeZoneDate, textCapitalize, currencyFormatter, getCookie, reloadWindow } from "gfdu";
export default class SettlementList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarToggle: true,
            settlementlist: [],
            pageno: 1,
            limit: 25,
            total: 0,
            loading: true,
            storelist: [],
            from: "",
            to: "",
            status: "",
            dateoption: "",
            search: "",
            loading: true,
            recordsLength:[],
            storeselectid: "",
            storenameselected: "all"

        };
    }
    componentDidMount() {
        this.getsettlementlist(this.state.pageno);
        this.storelist();
    }



    storelist = () => {
        ApiGateWay.get(`store/list`, (response) => {
            this.setState({ storelist: response.data, loading: false })
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
                        ? moment(e[1]).startOf("day").format("YYYY/MM/DD")
                        : "",
            },

            function () {
                self.getsettlementlist(this.state.pageno);
            }
        );
    }

    disabledDate(current) {
        return current > moment().endOf("day");
    }

    inputtext = (e) => {
        this.setState({ [e.target.name]: e.target.value },
            () => {
                this.getsettlementlist(this.state.pageno);
            })
    }


    removeFilter() {
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
                storenameselected: "all"

            },
            () => {
               
                this.getsettlementlist(this.state.pageno);
               
            })
            this.props.history.push("settlement")
    }



    getsettlementlist = (page) => {
        this.setState({
            pageno:page
        })
        let { from, to, status, dateoption, search, storeselectid, paymode,limit } = this.state;
        let queryParams = "";
        queryParams += dateoption === "" ? "" : dateoption === null ? "" : "&date_option=" + dateoption;
        queryParams += from === "" ? "" : from === null ? "" : "&from_time=" + from;
        queryParams += to === "" ? "" : to === null ? "" : "&to_time=" + to;
        queryParams += search === "" ? "" : search === null ? "" : "&search_string=" + search;
        queryParams += storeselectid === "" ? "" : storeselectid === null ? "" : "&store_id=" + storeselectid;

        getApiCall(`settlement/list?page=${page}&limit=${limit}${queryParams}`, (response) => {
            console.log(response)
            this.setState({ settlementlist: response.data, loading: false })
        })
    }

    storeselect = (event) => {
        if (event == "all") {
            this.setState({ storeselectid: "all" },
                () => {
                    this.getsettlementlist(this.state.pageno);
                })
        }
        else {
            this.setState({ storeselectid: JSON.parse(event).id, storenameselected: JSON.parse(event).valuename },
                () => {
                    this.getsettlementlist(this.state.pageno);
                })
        }
    }

    

    handledateopt(value) {
        this.setState(
            {
                dateoption: value,
            },
            () => {
                this.getsettlementlist(this.state.pageno);
            })
    }
    exportTransactions = () => {
        var self = this;
        let { from, to, status, dateoption, search, storeselectid, paymode } = self.state;
        let queryParams = "";
        queryParams += dateoption === "" ? "" : dateoption === null ? "" : "&date_option=" + dateoption;
        queryParams += from === "" ? "" : from === null ? "" : "&from_time=" + from;
        queryParams += to === "" ? "" : to === null ? "" : "&to_time=" + to;
        queryParams += search === "" ? "" : search === null ? "" : "&search_string=" + search;
        queryParams += storeselectid === "" ? "" : storeselectid === null ? "" : storeselectid === "all" ? "":"&store_id=" + storeselectid;
        if (this.state.settlementlist?.length > 0 === true) {
        axios({

            url:
                // "https://ippouat.ippopay.com/api/v1/merchant-panel/settlement/list?export=true" +
                "https://storeapi.ippopay.com/api/v1/merchant-panel/settlement/list?export=true" +
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
                link.setAttribute("download", "Settlements-Reports.csv");
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
        showToast("error", "There is no settlement data");
    }
    }


    render() {
        let { settlementlist, page, limit, total, filterDrawer, storelist ,storenameselected} = this.state;
        console.log(storelist)
        const { Option } = Select;
        const { RangePicker } = DatePicker;
        return (
            <>
            
                {this.state.loading && <Loader />}
                <div className="home-section">
                    <div className="home-content">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="table-header justi_start">
                                    <div className="left-side-search first-box ">
                                        <div className="search-box">
                                            <button className="btn"><i className="fe fe-search" aria-hidden="true"></i></button>
                                            <input className="form-control" placeholder="Search" type="text" value={this.state.search} name="search" onChange={(e) => this.inputtext(e)} />
                                        </div>

                                        <div className="datepicker boxradius" >
                                            <RangePicker style={{ width: 230 }}
                                                separator={"-"}
                                                onChange={(e) => this.handleOnDateChange(e)}
                                                format="DD/MM/YYYY"
                                                animateYearScrolling={false}
                                                disabledDate={this.disabledDate}
                                                value={[this.state.fromDate, this.state.toDate]}
                                                allowClear={false}
                                            />
                                        </div>
                                        <div className="storelist-dropdown storeboxradius">
                                            <Select
                                                placeholder="Store List"
                                                value={storenameselected}
                                                style={{ width: 200 }}
                                                name="storelist"
                                                onSelect={this.storeselect}
                                                removeIcon
                                                allowClear
                                                showArrow
                                            >
                                                 <Option value="all">All Stores</Option>
                                                {storelist?.map((storelist,j) =>
                                                    <Option key={j} value={JSON.stringify({ id: storelist.store_id, valuename: storelist?.name?.store })}>{storelist?.name?.store}</Option>
                                                )}
                                            </Select>
                                        </div>
                                        <div className="filteroption boxradius" >
                                            <Select name="Options" className="selectpicker" value={this.state.dateoption} id="Options" placeholder="Select Options"
                                                onChange={(e) => this.handledateopt(e)}
                                                 >
                                                <Option value="">All Options</Option>
                                                <Option value="today">Today</Option>
                                                <Option value="yesterday">Yesterday</Option>
                                                <Option value="weekly">This Week</Option>
                                                <Option value="monthly">This Month</Option>
                                                <Option value="yearly">This Year</Option>
                                            </Select>

                                        </div>
                                        <div><a className="table-drp-btn" onClick={e => this.removeFilter(e)}>Reset</a></div>
                                        
                                       <button  onClick={() => this.exportTransactions()} className="btn primary_btn export_btn">
                                            <span>Export </span>
                                        </button></div>
                                </div>
                                <div>

                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table_transaction">
                                                <thead>
                                                    <tr>
                                                        <th>S.NO</th>
                                                        <th>Date</th>
                                                        <th>Settlement ID</th>
                                                        <th>Type</th>
                                                        <th>Store Name</th>
                                                        <th>VPA ID</th>
                                                        <th>Merchant Name</th>
                                                        <th>Amount</th>
                                                        <th>Status</th>
                                                        <th>Details</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {settlementlist?.length > 0 ? (
                                                        settlementlist?.map((store, i) => (
                                                            <tr key={i}>
                                                                <td>{this.state.pageno * limit - limit + (i + 1)}</td>
                                                                <td>{showTimeZoneDate(
                                                                    returnFirstDegreeObjValue(
                                                                        store,
                                                                        "settlement_date"
                                                                    )
                                                                )}</td>
                                                                <td>{store?.settlement_id}</td>
                                                                <td>{textCapitalize(store?.settlement_type)}</td>
                                                                <td>{textCapitalize(store?.store?.name)}</td>
                                                                <td>{store?.vpa_details?.id}</td>
                                                                <td>{store?.merchant?.name}</td>
                                                                <td className="rupee">{currencyFormatter(store?.settlement_amount, "INR")}</td>
                                                                <td style={{ width: "102px" }} ><img style={{ display: "inline-block", verticalAlign: "middle" }} src={store?.status === "created" ? createdicon : settledicon}></img>{" "}<span style={{ display: "inline-block", verticalAlign: "middle" }}>{textCapitalize(store?.status)}</span></td>
                                                                <td><Link to={`/settlement/details/${store?.settlement_id}`} >
                                                                    <span className="view-button">view</span>
                                                                </Link></td>

                                                            </tr>

                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td style={{ textAlign: "center" }} colSpan="10">No Data Found</td>
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
