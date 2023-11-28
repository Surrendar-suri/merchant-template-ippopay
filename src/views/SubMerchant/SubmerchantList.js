import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import tick from "../../images/green-tick.svg"
import { Link } from "react-router-dom";
import { showToast } from "../../Constants/Utils";
import { ToastContainer } from "react-toastify";
import Loader from "../../components/Loader";
import editicon from "../../images/editicon.svg"
import deleteicon from "../../images/deleteicon.svg"
import { Popconfirm } from "antd";
import { getApiCall, postApiCall, deleteApiCall, patchApiCall, textCapitalize, getCookie, showTimeZoneDate } from "gfdu";
import { get } from "jquery";
import Pagination from "../../components/Pagination";


export default class SubmerchantList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarToggle: true,
            submerchant: {},
            pageno: 1,
            limit: 15,
            total: 0,
            loading: true,
            search: "",
            recordsLength:[]
        };
    }


    componentDidMount() {
        this.submerchant(this.state.pageno)
    }



    submerchant = (page) => {
        this.setState({
            pageno:page
        })
        let { search ,limit} = this.state;
        let queryParams = "";
        queryParams += search === "" ? "" : search === null ? "" : "&search_string=" + search;
        getApiCall(`sub-merchant/list?page=${page}&limit=${limit}${queryParams}`,
            (response) => {
                if (response) {
                    console.log(response)
                    this.setState({ submerchant: response.data, loading: false })
                }
                else {
                    this.setState({loading: false })
                    showToast("error", response.message);
                }

            })
    }


    handledelete = (id) => {

        let data = {
            sub_merchant_id: id
        }
        deleteApiCall(`sub-merchant/delete`, { data },
            (response) => {
                if (response.success) {
                    showToast("success", response.message);
                    this.submerchant(this.state.pageno);
                }
                else {
                    showToast("error", response.message);
                }
            })
    }

    statuschange = (id) => {
        let data = {
            sub_merchant_id: id
        }

        patchApiCall(`sub-merchant/status-update`, data,
            (response) => {
                if (response.success) {
                    showToast("success", response.message);
                    this.submerchant(this.state.pageno)
                }
                else {
                    showToast("error", response.message);
                }

            })
    }


    inputtext = (e) => {
        this.setState({ [e.target.name]: e.target.value },
            () => {
                this.submerchant(this.state.pageno);
            })
    }


    removeFilter() {
        this.setState(
            {
                search: ""
            },
            () => {
                this.submerchant(this.state.pageno);
            })
    }

    render() {
        let { submerchant, page, limit } = this.state;
        console.log(submerchant)

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
                                            <input className="form-control" value={this.state.search} name="search"onChange={(e) => this.inputtext(e)} placeholder="Search" type="search" />
                                        </div>
                                    </div>
                                    <div className="filter-btns ">
                                        <button onClick={()=>this.removeFilter()} className="table-drp-btn">
                                            <span>RESET </span>
                                        </button>
                                        <Link to="/submerchant/add" className="btn primary_btn m-l-10">
                                            <span>+ Add Sub Merchant</span>
                                        </Link>
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
                                                        <th>Sub-Merchant</th>
                                                        <th>Phone No</th>
                                                        <th>Store Names</th>
                                                        {/* <th style={{ textAlign: "center" }}>View Details</th> */}
                                                        <th>Status</th>
                                                        <th style={{ textAlign: "center" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {submerchant?.length > 0 ? (
                                                        submerchant?.map((submerchant, i) => (
                                                            <tr key={i}>
                                                                <td>{this.state.pageno * limit - limit + (i + 1)}</td>
                                                                <td>{showTimeZoneDate(submerchant?.createdAt)?showTimeZoneDate(submerchant?.createdAt):"No Data Found"}</td>
                                                                <td>
                                                                <Link to={`/submerchant/details/${submerchant?.merchant_id}`} >
                                                                    {submerchant?.name?.full}
                                                                </Link>
                                                                </td>

                                                                <td>{submerchant?.phone?.national_number}</td>
                                                                <td>
                                                                    <div className="store_name_wrap">
                                                                        {submerchant?.stores.map((storelistobj, j) => (
                                                                            <span key={j} className="store_name_btn">{storelistobj?.store_name ? storelistobj?.store_name : '-'}</span>
                                                                        ))}
                                                                    </div>
                                                                </td>
                                                                {/* <td style={{ textAlign: "center" }}> <Link to={`/submerchant/details/${submerchant?.merchant_id}`} >
                                                                    <span className="view-button">view</span>
                                                                </Link></td> */}

                                                                <td>   <Popconfirm
                                                                    title="Do You Want To Change The Status?"
                                                                    onConfirm={() => this.statuschange(submerchant.merchant_id)}
                                                                    onCancel={this.cancel}
                                                                    okText="Ok"
                                                                    cancelText="Cancel">

                                                                    <span className={submerchant.status === "active" ? "view-button active-btn" : "view-button deactive-btn"}>{textCapitalize(submerchant.status)}</span>

                                                                </Popconfirm>
                                                                </td>

                                                                <td style={{ textAlign: "center" }} ><div className="addedit_btn"> <Link to={`submerchant/edit/${submerchant?.merchant_id}`} >
                                                                    <span className="view-button edit-btn"><i className="fe fe-edit"></i> Edit</span>
                                                                </Link>
                                                                    <Popconfirm
                                                                        title="Do You Want To Delete This Sub User ?"
                                                                        onConfirm={() => this.handledelete(submerchant?.merchant_id)}
                                                                        onCancel={this.cancel}
                                                                        okText="Ok"
                                                                        cancelText="Cancel">

                                                                        <span style={{ marginLeft: "10px" }} className="view-button delete-btn"><i className="fe fe-trash-2"></i> Delete</span>
                                                                    </Popconfirm>
                                                                    </div>

                                                                </td>

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

