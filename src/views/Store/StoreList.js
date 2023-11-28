import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import tick from "../../images/green-tick.svg"
import { Link } from "react-router-dom";
import { setCookie, storageSetItem, getApiCall, postApiCall, returnFirstDegreeObjValue, showTimeZoneDate, currencyFormatter } from "gfdu";
import { showToast } from "../../Constants/Utils";
import { ToastContainer } from "react-toastify";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import { Popover,Button } from "antd";


export default class StoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarToggle: true,
            pageno: 1,
            limit: 25,
            total: 0,
            storelist: [],
            loading: true,
            search: "",
            recordsLength: []
        };
    }
    componentDidMount() {
        this.storelist(this.state.pageno)

    }

    storelist = (page) => {
        this.setState({
            pageno: page
        })
        let { search, limit } = this.state;
        let queryParams = "";
        queryParams += search === "" ? "" : search === null ? "" : "&search_string=" + search;


        getApiCall(`store/list?page=${page}&limit=${limit}${queryParams}`,
            (response) => {
                if (response.success) {
                    console.log(response)
                    this.setState({ storelist: response.data, loading: false })

                }
                else {
                    this.setState({ loading: false })
                    showToast("error", response.message);
                }

            })
    }

    inputtext = (e) => {
        this.setState({ [e.target.name]: e.target.value },
            () => {
                this.storelist(this.state.pageno);
            })
    }

    removeFilter() {
        this.setState(
            {
                search: ""
            },
            () => {
                this.storelist(this.state.pageno);
            })
    }

    render() {

        let { storelist, page, limit } = this.state;
        return (
            <>
                {this.state.loading && <Loader />}
            
                <div className="home-section">
                    <div className="home-content">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="table-header">
                                    <div className="left-side-search">
                                        <div className="search-box">
                                            <button className="btn"><i className="fe fe-search" aria-hidden="true"></i></button>
                                            <input className="form-control" name="search" onChange={(e) => this.inputtext(e)} value={this.state.search} placeholder="Search" type="search" />
                                        </div>
                                    </div>
                                    <div className="filter-btns">
                                        <button onClick={() => this.removeFilter()} className="table-drp-btn">
                                            <span>RESET</span>
                                        </button>
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
                                                        <th>Store Name</th>
                                                        <th><span style={{ width: "175px", display: "inline-block" }}>Sub Merchant Name</span></th>
                                                        <th>Branch Location</th>
                                                        <th>Store Category</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {storelist.length > 0 ? (
                                                        storelist.map((store, i) => (
                                                            <tr key={i}>
                                                                <td>{this.state.pageno * limit - limit + (i + 1)}</td>
                                                                <td>
                                                                    {showTimeZoneDate(store?.createdAt)}
                                                                </td>
                                                                <td>{store?.name?.full==="" ? store?.name?.store :store?.name?.full}</td>
                                                                <td>{store?.sub_merchant_name}</td>
                                                                <td>
                                                                    <Popover content={<p>{store?.location?.agent_store?.street_name}{" "}{store?.location?.agent_store?.area}{" "}
                                                                    {store?.location?.agent_store?.city}{" "}{store?.location?.agent_store?.state}{" "}{store?.location?.agent_store?.pincode}</p>}>
                                                                        <span type="primary">{store?.location?.agent_store?.area}</span>
                                                                    </Popover>
                                                                </td>

                                                                <td>{(store?.business?.business_type?.name)?(store?.business?.business_type?.name):(store?.business?.business_type?.subCategory)}</td>
                                                                <td>
                                                                    <Link to={`/store/details/${store.store_id}`} >
                                                                        <span className="view-button">VPA List</span>
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
