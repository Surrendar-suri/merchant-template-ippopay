import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import tick from "../../images/green-tick.svg"
import { Link } from "react-router-dom";
import { getApiCall, getCookie, postApiCall, showTimeZoneDate } from "gfdu";
import { Modal, Button } from "antd"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";
import { showToast, textCapitalize } from "../../Constants/Utils";
import Pagination from "../../components/Pagination";
export default class SettlementBankList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarToggle: true,
            banklist: [],
            pageno: 1,
            limit: 15,
            total: 0,
            acc_number: "",
            loading: true,
            recordsLength: []


        };
    }
    componentDidMount() {
        this.getbanklist(this.state.pageno)
    }

    onlynumber = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ [e.target.name]: e.target.value })
        }
    };


    inputdata = (event) => {
        this.setState({

            [event.target.name]: event.target.value,
        });
    };

    handlemodal = () => {
        var self = this;
        self.setState({ addbank_modal: true })

    }

    hidemodal = () => {
        let { addbank_modal } = this.state;
        this.setState({
            addbank_modal: !addbank_modal
        });
        this.removeFilter()
    };

    removeFilter() {
        this.setState(
            {
                ifsc: "",
                accholdername: "",
                acc_number: "",

            })
    }


    getbanklist = (page) => {
        this.setState({
            pageno:page
        })
        let { limit } = this.state;
        getApiCall(`bank/list?page=${page}&limit=${limit}`,
            (response) => {
                this.setState({ banklist: response.data, loading: false })
            })
    }

    handlesubmit = () => {

        let { ifsc, accholdername, acc_number } = this.state;

        if (!ifsc) {
            showToast("error", "Please Enter The Valid IFSC");
        }
        else if (!accholdername) {
            showToast("error", "Please Enter The Valid Account Holder Name");
        }
        else if (!acc_number) {
            showToast("error", "Please Enter The Valid Account Number");
        }

        else {
            let data = {
                ifsc: ifsc,
                acc_holder_name: accholdername,
                acc_no: acc_number
            }

            postApiCall(`bank/create`, data, (response) => {
                if (response.success) {
                    showToast("success", response.message);
                    this.hidemodal();
                    this.getbanklist(this.state.pageno);
                }
                else {
                    showToast("error", response.message);
                }
            })
        }
    }



    render() {
        let { banklist, page, limit, ifsc, accholdername, acc_number } = this.state;
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
                                        {/* <div className="search-box">
                                            <button className="btn"><i className="fe fe-search" aria-hidden="true"></i></button>
                                            <input className="form-control" placeholder="Search" type="search" />
                                        </div> */}
                                    </div>
                                    <div className="filter-btns ">
                                        {/* <button className="table-drp-btn btn">
                                            <span>Filters </span><i className="bx bx-chevron-down bx-sm"></i>
                                        </button> */}
                                        <a onClick={() => this.handlemodal()} className="btn primary_btn m-l-10">
                                            <span >+ Add Settlement Bank</span>
                                        </a>
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
                                                        <th>Bank Name</th>
                                                        <th>Branch Name</th>
                                                        <th>IFSC Number</th>
                                                        <th>Account Number</th>
                                                        <th>Account Holder Name</th>
                                                        {/* <th>Status</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {banklist.length > 0 ? (
                                                        banklist.map((bank, i) => (
                                                            <tr key={i}>
                                                                <td>{this.state.pageno * limit - limit + (i + 1)}</td>
                                                                <td>{showTimeZoneDate(bank?.createdAt)}</td>
                                                                <td>{bank?.account?.name}</td>
                                                                <td>{bank?.account?.branch}</td>
                                                                <td>{bank?.account?.ifsc}</td>
                                                                <td>{bank?.account?.acc_no}</td>
                                                                <td>{bank?.account?.acc_holder_name}</td>
                                                                {/* <td>{bank?.status}</td> */}
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


                <Modal width={700} title="Add Settlement Bank" visible={this.state.addbank_modal} onCancel={this.hidemodal}
                    footer={[

                        <Button className="btn btn-primary primary-btn" onClick={this.handlesubmit} >Save & Continue</Button>
                    ]}
                >
                    <div className="clearfix merchant-form">
                        <div className="col-xs-12 p-0">
                            <div className="form-group row">
                                <div className="col-xs-4">
                                    <label className="store-form-label" htmlFor="ifsc">IFSC CODE</label>
                                    <input className="form-control" name="ifsc" type="text" value={ifsc} onChange={(e) => this.inputdata(e)} />
                                </div>
                                <div className="col-xs-4">
                                    <label className="store-form-label" htmlFor="accholdername">Account Holder Name</label>
                                    <input className="form-control" name="accholdername" type="text" value={accholdername} onChange={(e) => this.inputdata(e)} />
                                </div>
                                <div className="col-xs-4">
                                    <label className="store-form-label" htmlFor="acc_number">Account Number</label>
                                    <input className="form-control" name="acc_number" type="text" value={acc_number} onChange={(e) => this.onlynumber(e)} />
                                </div>
                            </div>
                        </div>

                    </div>
                </Modal>

            </>
        );
    }
}
