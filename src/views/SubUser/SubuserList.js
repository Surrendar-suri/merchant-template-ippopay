import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import tick from "../../images/green-tick.svg"
import { Link } from "react-router-dom";
import { getApiCall, getCookie, postApiCall, deleteApiCall, showTimeZoneDate } from "gfdu";
import { Modal, Button, Select, Popconfirm } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isInvalidName, showToast, textCapitalize } from "../../Constants/Utils";
import Loader from "../../components/Loader";
import axios from "axios";
import { patchApiCall } from "gfdu";
import Pagination from "../../components/Pagination";

export default class SubuserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarToggle: true,
            subuserlist: [],
            pageno: 1,
            limit: 25,
            total: 0,
            storelist: [],
            loading: true,
            // storenameselected: "",
            phonenumber: "",
            subusername: "",
            search: "",
            recordsLength: []


        };
    }

    componentDidMount() {
        this.subuserlist(this.state.pageno)
        this.storelist()
        // this.vpalist()
    }

    onlynumber = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ [e.target.name]: e.target.value })
        }
    };

    storelist = () => {
        ApiGateWay.get(`store/list`, (response) => {
            this.setState({ storelist: response.data, loading: false })
        })
    }

    vpalist = () => {

        let { storeselectid } = this.state;

        let queryParams = "";
        queryParams += storeselectid === "" ? "" : storeselectid === null ? "" : "&store_id=" + storeselectid;
        ApiGateWay.get(`vpa/list?${queryParams}`, (response) => {
            // console.log(response)
            this.setState({ vpalist: response.data.vpa_list, loading: false })
        })
    }



    storeselect = (event) => {
        this.setState({ storeselectid: JSON.parse(event).id, storenameselected: JSON.parse(event).valuename },
            () => {
                this.vpalist()
            })
    }

    vpaselect = (event) => {
        this.setState({ selected_vpa_id: event })
    }


    inputtext = (e) => {
        this.setState({ [e.target.name]: e.target.value },
            () => {
                this.subuserlist(this.state.pageno);
            })
    }

    subuserlist = (page) => {
        this.setState({
            pageno: page
        })
        let { search, limit } = this.state;
        let queryParams = "";
        queryParams += search === "" ? "" : search === null ? "" : "&search_string=" + search;

        getApiCall(`subuser/list?page=${page}&limit=${limit}${queryParams}`,
            (response) => {
                if (response.success) {
                    this.setState({ subuserlist: response.data })
                }
                else {
                    showToast("error", response.message);
                }
            })
    }



    inputdata = (event) => {
        this.setState({

            [event.target.name]: event.target.value,
        });
    };

    handlemodal = () => {
        var self = this;
        self.setState({ addsubuser_modal: true })

    }

    subuserhidemodal = () => {
        let { addsubuser_modal } = this.state;
        this.setState({
            addsubuser_modal: !addsubuser_modal
        });
        this.removeFilter()
    };

    removeFilter() {
        this.setState(
            {
                subusername: "",
                phonenumber: "",
                storeselectid: "",
                storenameselected: "",
                search: "",
                selected_vpa_id: ""
            },
            () => {
                this.subuserlist(this.state.pageno);
            })
    }

    handlesubmit = () => {

        let { subusername, phonenumber, storelist, storeselectid, storenameselected, selected_vpa_id } = this.state;
        let merchantdetails = JSON.parse(getCookie("merchantobject"));
        // console.log(subusername, phonenumber, storeselectid)

        let data = {
            phone: {
                country_code: "91",
                national_number: phonenumber
            },
            merchant: {
                id: merchantdetails.merchant_id,
                name: merchantdetails.Owner_name
            },
            store: {
                id: storeselectid,
                name: {
                    store: storenameselected
                }
            },
            name: subusername,
            vpa_id: selected_vpa_id

        }
        if(subusername==="" || subusername===null){
            toast.info("please enter the subuser name")
        }
        else if(subusername.length<4){
            toast.info("Please enter the subuser name minimum 4 characters");
        }
        else if (isInvalidName(subusername)) {
            toast.info(
                "Please enter the subuser name in alphabets only "
            );
        }
        else if (!phonenumber.match(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d$/gm)) {
            toast.info("please enter valid mobile number");
        }
        else {
            postApiCall(`subuser/create`, data, (response) => {
                if (response.success) {
                    showToast("success", response.message);
                    this.subuserhidemodal()
                    this.subuserlist(this.state.pageno)
                }
                else {
                    showToast("error", textCapitalize(response.message === "must be send a valid store id" ? "Must Select Valid Store Name" : response.message));
                }



            })
        }
    }

    statuschange = (id) => {
        let data = {
            sub_user_id: id
        }

        patchApiCall(`subuser/status-update`, data,
            (response) => {
                if (response.success) {
                    showToast("success", response.message);
                    this.subuserlist(this.state.pageno)
                }
                else {
                    showToast("error", response.message);
                }

            })
    }

    handledelete = (id) => {

        let data = {
            sub_user_id: id
        }
        deleteApiCall(`subuser/delete`, { data },
            (response) => {
                if (response.success) {
                    showToast("success", response.message);
                    this.subuserlist(this.state.pageno);
                }
                else {
                    showToast("error", response.message);
                }
            })
    }


    render() {
        const { Option } = Select;

        let { subuserlist, page, limit, storelist, subusername, phonenumber, storenameselected, vpalist } = this.state;
        console.log(this.state)


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
                                            <input className="form-control" placeholder="Search" value={this.state.search} name="search" onChange={(e) => this.inputtext(e)} type="search" />
                                        </div>
                                    </div>
                                    <div className="filter-btns ">
                                        <button onClick={() => this.removeFilter()} className="table-drp-btn">
                                            <span>RESET </span>
                                        </button>
                                        {/* <Link to="/subuser/add" className="btn primary_btn m-l-10">
                      <span>+ Add Sub User</span>
                    </Link> */}

                                        <a className="btn primary_btn m-l-10" onClick={() => this.handlemodal()}> <span>+ Add Sub User</span></a>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table_transaction">
                                                <thead>
                                                    <tr>
                                                        <th>S.No </th>
                                                        <th>Date</th>
                                                        <th>Subuser Name</th>
                                                        <th>Store</th>
                                                        <th>Phone No</th>
                                                        <th>VPA ID</th>
                                                        <th>Status</th>
                                                        <th style={{ textAlign: "center" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {subuserlist.length > 0 ? (
                                                        subuserlist.map((subuser, i) => (
                                                            <tr key={i}>
                                                                <td>{this.state.pageno * limit - limit + (i + 1)}</td>
                                                                <td>{showTimeZoneDate(subuser?.createdAt)}</td>
                                                                <td>                                                                    <Link to={`/subuser/details/${subuser.sub_user_id}`} >
                                                                    {(subuser?.name?.full) ? (subuser?.name?.full) : (subuser?.name)}</Link></td>
                                                                <td>{(subuser?.store?.name?.store) ? (subuser?.store?.name?.store) : (subuser?.store?.name.length > 0 ? subuser?.store?.name : "")}
                                                                </td>
                                                                <td>{subuser?.phone?.national_number}</td>

                                                                <td>{subuser.vpa_id}</td>
                                                                <td >

                                                                    <Popconfirm
                                                                        title="Do You Want To Change The Status?"
                                                                        onConfirm={() => this.statuschange(subuser.sub_user_id)}
                                                                        onCancel={this.cancel}
                                                                        okText="Ok"
                                                                        cancelText="Cancel">   
                                                                        <span className={subuser.status === "active" ? "view-button active-btn" : "view-button deactive-btn"}>{textCapitalize(subuser.status)}</span>
                                                                    </Popconfirm>
                                                                </td>

                                                                <td style={{ textAlign: "center" }} ><div className="addedit_btn"> <Link to={`subuser/edit/${subuser?.sub_user_id}`} >
                                                                    <span className="view-button edit-btn"><i className="fe fe-edit"></i> Edit</span>
                                                                </Link>

                                                                    <Popconfirm
                                                                        title="Do You Want To Delete This Sub User ?"
                                                                        onConfirm={() => this.handledelete(subuser?.sub_user_id)}
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




                <Modal width={700} title="Add Sub User" visible={this.state.addsubuser_modal} onCancel={this.subuserhidemodal}
                    footer={[

                        <Button className="btn btn-primary primary-btn" onClick={this.handlesubmit} >Save & Continue</Button>



                    ]}>
                    <form className="clearfix merchant-form">
                        <div className="col-xs-12 p-0">
                            <div className="form-group row">
                                <div className="col-xs-5 m-b-15">
                                    <label className="store-form-label" htmlFor="name">sub-user name</label>
                                    <input className="form-control" name="subusername" type="text" value={subusername} onChange={(e) => this.inputdata(e)} />
                                </div>
                                <div className="col-xs-5 m-b-15">
                                    <label className="store-form-label" htmlFor="phonenumber">sub-user mobile number</label>
                                    <input className="form-control" name="phonenumber" type="text" value={phonenumber} maxLength={10} onChange={(e) => this.onlynumber(e)} />
                                </div>
                                <div className="col-xs-5">
                                    <label className="store-form-label" htmlFor="stores"> Select Store Name </label>

                                    <Select

                                        placeholder="Store List"
                                        value={storenameselected}
                                        name="Store List"
                                        onSelect={this.storeselect}
                                        className="form-control"
                                        removeIcon
                                        allowClear
                                        showArrow

                                    >
                                        {storelist?.map((storelist,m) =>
                                            <Option key={m} value={JSON.stringify({ id: storelist.store_id, valuename: storelist?.name?.store })}>{storelist?.name?.store}</Option>
                                        )}
                                    </Select>


                                </div>



                                <div className="col-xs-5">
                                    <label className="store-form-label" htmlFor="stores"> Select VPA ID </label>

                                    <Select

                                        placeholder="VPA List"
                                        value={this.state.selected_vpa_id}
                                        name="vpalist"
                                        onSelect={this.vpaselect}
                                        className="form-control"
                                        removeIcon
                                        allowClear
                                        showArrow
                                        notFoundContent="Please Select Store! (or) No VPA Available For The Selected Store"

                                    >
                                        {vpalist?.map((vpa, i) =>
                                            <Option key={i} value={vpa?.vpa?.id} >{vpa?.vpa?.name}</Option>
                                        )}
                                    </Select>


                                </div>
                            </div>
                        </div>

                    </form>


                </Modal>
            </>
        );
    }
}
