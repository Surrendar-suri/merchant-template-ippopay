import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import tick from "../../images/green-tick.svg"
import { Link } from "react-router-dom";
import { getApiCall, showTimeZoneDate } from "gfdu";
import { textCapitalize } from "../../Constants/Utils";
import failed from "../../images/amountfailed.svg"
import Modal from "antd/lib/modal/Modal";



export default class Vpalist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarToggle: true,
            vpalist: [],
            page: 1,
            limit: 5

        };
    }
    componentDidMount() {
        this.vpalist()
    }


    vpalist = () => {
        getApiCall(`vpa/list`, (response) => {
            console.log(response)
            this.setState({ vpalist: response?.data?.vpa_list })
        })
    }

    showqr = (event) => {
        console.log(event)
        this.setState({openModal :true,vpamapdata:event})

    }
    hideModal = () => {
        this.setState({
            openModal: false
        });
    };


    render() {
        let { vpalist, page, limit ,vpamapdata} = this.state;
        return (
            <>
                <div className="home-section">
                    <div className="home-content">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-main-title m-b-10">Store details</div>
                                        <div className="row">
                                            <div className="col-xs-12 p-0">
                                                <div className="col-xs-3 ">
                                                    <div className="details_head">Store name</div>
                                                    <div className="details_desc">GRT</div>
                                                </div>
                                                <div className="col-xs-3 ">
                                                    <div className="details_head">Store address</div>
                                                    <div className="details_desc">T.Nagar</div>
                                                </div>
                                                <div className="col-xs-3 ">
                                                    <div className="details_head">Shop ID</div>
                                                    <div className="details_desc">1019110191</div>
                                                </div>
                                                <div className="col-xs-3 ">
                                                </div>
                                            </div>
                                            <div className="col-xs-12 p-0">
                                                <div className="col-xs-3 ">
                                                    <div className="details_head">Sub MErchant name</div>
                                                    <div className="details_desc">Rajkumar</div>
                                                </div>
                                                <div className="col-xs-3 ">
                                                    <div className="details_head">Phone Number</div>
                                                    <div className="details_desc">+91 12345 67890</div>
                                                </div>
                                                <div className="col-xs-3 ">
                                                    <div className="details_head">total No of VPA</div>
                                                    <div className="details_desc">04</div>
                                                </div>
                                                <div className="col-xs-3 ">
                                                    <a className="view-link"><span>View more</span><i className="bx bx-chevron-right bx-sm"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-header" style={{ paddingTop: "5px" }}>
                                    <div className="left-side-search">
                                        <div className="search-box">
                                            <button className="btn"><i className="fe fe-search" aria-hidden="true"></i></button>
                                            <input className="form-control" placeholder="Search" type="search" />
                                        </div>
                                    </div>
                                    <div className="filter-btns">
                                        <button className="table-drp-btn btn">
                                            <span>Filters </span><i className="bx bx-chevron-down bx-sm"></i>
                                        </button>
                                        <button className="btn default_btn m-l-10">
                                            <span>Back </span>
                                        </button>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table_transaction">
                                                <thead>
                                                    <tr>
                                                        <th>S.no</th>
                                                        <th>Created At</th>
                                                        <th>VPA ID</th>
                                                        <th>Bank Name</th>
                                                        <th>Status</th>
                                                        <th>QR CODE</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {vpalist.length > 0 ? (
                                                        vpalist?.map((vpalist, i) => (
                                                            <tr key={i}>
                                                                <td>{page * limit - limit + (i + 1)}</td>
                                                                <td>{showTimeZoneDate(vpalist?.createdAt)}</td>
                                                                <td>{vpalist?.vpa?.id}</td>
                                                                <td>{textCapitalize(vpalist?.vpa?.bank)}</td>
                                                                <td>{textCapitalize(vpalist?.status)} {vpalist?.status === "active" ? (<img src={tick} />) : (<img src={failed} />)}</td>
                                                                <td><span onClick={(e)=>this.showqr(vpalist)} className="view-button">view</span></td>

                                                            </tr>

                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td style={{ textAlign: "center" }} colSpan="10">No Data Found</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal title="Current VPA QR Code" visible={this.state.openModal} onCancel={this.hideModal} footer={null}>
                    <img className="qrcenter" src={vpamapdata?.vpa?.data_url}></img>
            
                    <h4 style={{ "textAlign": 'center', "paddingTop": "15px" }}>{vpamapdata?.vpa?.id}</h4>
                </Modal>
            </>
        );
    }
}