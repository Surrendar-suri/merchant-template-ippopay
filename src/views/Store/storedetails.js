import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import tick from "../../images/green-tick.svg"
import { Link } from "react-router-dom";
import { getApiCall, showTimeZoneDate } from "gfdu";
import { showToast, textCapitalize } from "../../Constants/Utils";
import failed from "../../images/amountfailed.svg"
import Modal from "antd/lib/modal/Modal";
import Loader from "../../components/Loader";

let store_id;
export default class Storedetails extends Component {
    constructor(props) {
        super(props);
        store_id = this.props.match.params.id;
        this.state = {
            sidebarToggle: true,
            vpalist: [],
            page: 1,
            limit: 5,
            details: {},
            modalVisible: false,
            bankInfo: "",
            loading: true,
        };
    }
    componentDidMount() {
        this.details()
        this.vpalist()
    }

    details = () => {
        getApiCall(`store/detail/${store_id}`,
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



    vpalist = () => {
        getApiCall(`vpa/list?store_id=${store_id}`, (response) => {
            console.log(response)
            this.setState({ vpalist: response?.data?.vpa_list })
        })
    }

    showqr = (event) => {
        console.log(event)
        this.setState({ openModal: true, vpamapdata: event })

    }
    hideModal = () => {
        this.setState({
            openModal: false
        });
    };
    modalCancel = () => {
        this.setState({
            modalVisible: false
        })
    }
    modalShow = (obj) => {
        this.setState({
            modalVisible: true,
            bankInfo: obj
        })
    }


    render() {
        let { vpalist, page, limit, vpamapdata, details, bankInfo } = this.state;
        return (
            <>
                {this.state.loading && <Loader />}
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
                                                    <div className="details_desc">{details?.name?.store ? details?.name?.store : "-"}</div>
                                                </div>
                                                <div className="col-xs-5 ">
                                                    <div className="details_head">Store address</div>
                                                    <div className="details_desc">{details?.location?.agent_store?.flat_no}{" "}{details?.location?.agent_store?.street_name}{" "}{details?.location?.agent_store?.area}</div>
                                                </div>
                                                <div className="col-xs-4 ">
                                                    <div className="details_head">Store ID</div>
                                                    <div className="details_desc">{details?.store_id ? details?.store_id : "-"}</div>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 p-0">
                                                <div className="col-xs-3 ">
                                                    <div className="details_head">Sub merchant name</div>
                                                    <div className="details_desc">{details?.sub_merchant_name ? details?.sub_merchant_name : "-"}</div>
                                                </div>
                                                {/* <div className="col-xs-3 ">
                                                    <div className="details_head">Phone Number</div>
                                                    <div className="details_desc">+91 12345 67890</div>
                                                </div> */}
                                                <div className="col-xs-3 ">
                                                    <div className="details_head">total No of VPA</div>
                                                    <div className="details_desc">{vpalist.length}</div>
                                                </div>
                                                {/* <div className="col-xs-3 ">
                                                    <a className="view-link"><span>View more</span><i className="bx bx-chevron-right bx-sm"></i></a>
                                                </div> */}
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
                                        {/* <button className="table-drp-btn btn">
                                            <span>Filters </span><i className="bx bx-chevron-down bx-sm"></i>
                                        </button> */}
                                        <Link to="/store" className="btn default_btn m-l-10">
                                            <span>Back </span>
                                        </Link>
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
                                                        <th>VPA Name</th>
                                                        <th>VPA ID</th>
                                                        <th>Bank Name</th>
                                                        <th>Status</th>
                                                        <th>QR CODE</th>
                                                        <th>View Account</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {vpalist?.length > 0 ? (
                                                        vpalist?.map((vpalist, i) => (
                                                            <tr key={i}>
                                                                <td>{page * limit - limit + (i + 1)}</td>
                                                                <td>{showTimeZoneDate(vpalist?.createdAt)}</td>
                                                                <td>{vpalist?.vpa?.name}</td>
                                                                <td>{vpalist?.vpa?.id}</td>
                                                                <td>{textCapitalize(vpalist?.account?.name !== "" && vpalist?.account?.ifsc !== "" ? (vpalist?.account?.name === "" ? vpalist?.account?.ifsc : vpalist?.account?.name) : "-")}</td>
                                                                <td><span style={{ fontWeight: "500" }} className={vpalist?.status === "active" ? "new-text-success" : "text-danger"}>{textCapitalize(vpalist?.status)}
                                                                    {/* {vpalist?.status === "active" ? (<img style={{width:"18px",height:"18px"}} src={tick} />) : (<img style={{width:"18px",height:"18px"}} src={failed} />)} */}
                                                                </span></td>
                                                                <td><span onClick={(e) => this.showqr(vpalist)} className="view-button">view</span></td>
                                                                <td><span onClick={(e) => this.modalShow(vpalist)} className="view-button">Bank Info</span></td>

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

                <Modal title="QR Code" visible={this.state.openModal} onCancel={this.hideModal} footer={null}>
                    <img className="qrcenter" src={vpamapdata?.vpa?.data_url}></img>

                    <h4 style={{ "textAlign": 'center', "paddingTop": "15px" }}>{vpamapdata?.vpa?.id}</h4>
                </Modal>

                <Modal title="Bank Details" visible={this.state.modalVisible} onCancel={this.modalCancel} footer={null}>
                    <div className="pop_flex">
                        <div className="pop_label">Account Number :</div>
                        <div className="pop_desc">{bankInfo?.account?.number === "" ? "- " : bankInfo?.account?.number}</div>
                    </div>
                    <div className="pop_flex">
                        <div className="pop_label">Account Holder Name :</div>
                        <div className="pop_desc">{bankInfo?.account?.acc_holder_name === "" ? "- " : bankInfo?.account?.acc_holder_name}</div>
                    </div>
                    <div className="pop_flex">
                        <div className="pop_label">Bank Name :</div>
                        <div className="pop_desc">{bankInfo?.account?.name === "" ? "- " : bankInfo?.account?.name}</div>
                    </div>
                    <div className="pop_flex">
                        <div className="pop_label">IFSC Code :</div>
                        <div className="pop_desc">{bankInfo?.account?.ifsc === "" ? "- " : bankInfo?.account?.ifsc}</div>
                    </div>

                    <div className="pop_flex">
                        <div className="pop_label">Branch :</div>
                        <div className="pop_desc">{bankInfo?.account?.branch === "" ? "- " : bankInfo?.account?.branch}</div>
                    </div>
                </Modal>


            </>
        );
    }
}