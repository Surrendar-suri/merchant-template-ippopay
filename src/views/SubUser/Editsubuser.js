import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import tick from "../../images/green-tick.svg"
import { Link } from "react-router-dom";
import { Checkbox, Select } from "antd";
import { postApiCall, getCookie, getApiCall, patchApiCall } from "gfdu";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isInvalidName, showToast } from "../../Constants/Utils";
let selectedstores = [];
let subuser_id;
export default class EditSubuser extends Component {
    constructor(props) {
        super(props);
        subuser_id = this.props.match.params.id;
        this.state = {
            sidebarToggle: true,
            storelist: [],
            selectedstores: {},
            detailsselectedstore: [],
            checkedstores: [],
            storeselectid: "",

        };
    }
    componentDidMount() {
        this.details()

    }
    componentDidUpdate(){
        this.vpalist()
    }
    details = () => {

        getApiCall(`subuser/detail/${subuser_id}`,
            (response) => {
                if (response.success) {
                    this.setState({ details: response.data })
                    let details = response.data;
                    console.log(response?.data?.store?.id);
                    this.setState({
                        subusername: response?.data?.name,
                        phonenumber: response?.data?.phone?.national_number,
                        status: response?.data?.status,
                        selectedstore: response?.data?.store?.name?.store,
                        storeselectid: response?.data?.store?.id,
                        storenameselected: response?.data?.store?.name?.store || response?.data?.store?.name,
                        selectedvpa: response?.data?.vpa_id,


                    }, () => {
                        this.storelist();
                    })
                    console.log(this.state.detailsselectedstore)
                }
                else {
                    showToast("error", response.message);
                }

            })
    }

    // storechange = (newstoreselected) => {
    //     this.setState({ selectedstore: newstoreselected })
    // }

    onlynumber = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ [e.target.name]: e.target.value })
        }
    };


    vpalist = () => {

        let { storeselectid } = this.state;
        console.log("80", storeselectid);
        let queryParams = "";
        // queryParams += storeselectid === "" ? "" : storeselectid === null ? "" : "&store_id=" + storeselectid;

        ApiGateWay.get(`vpa/list?store_id=${storeselectid}`, (response) => {
            // console.log(response)
            this.setState({ vpalist: response.data.vpa_list, loading: false })
        })
    }

    vpaselect = (event) => {
        this.setState({ selectedvpa: event })
    }
    storeselect = (event) => {
        this.setState({ storeselectid: JSON.parse(event).id, storenameselected: JSON.parse(event).valuename },
            () => {
                this.vpalist()
                this.setState({ selectedvpa: "" })
            })
    }
    storelist = () => {

        ApiGateWay.get(`store/list`, (response) => {
            this.setState({ storelist: response.data, loading: false }, () => {
                this.selectedstore();
            })
        })
    }

    selectedstore = () => {
        let { detailsselectedstore, storelist } = this.state
        let getstores = [];
        console.log(detailsselectedstore, storelist)
        storelist.forEach(o => {

            if (detailsselectedstore.some(slot => slot === o.store_id)) {

                o.checked = true;
                getstores.push(o);
            } else {

                o.checked = false;
                getstores.push(o);
            }

            this.setState({ checkedstores: getstores })
        });

    }



    storecheck = (event) => {
        console.log(event)
        console.log(event.target.value, "console")
        let storedata = JSON.parse((event.target.value))

        let obj = {
            store_id: storedata.id,
            store_name: storedata.name
        }
        selectedstores.push(obj)
    }

    removeFilter() {
        this.setState(
            {
                name: "",
                phonenumber: "",
                email: "",
                street: "",
                area: "",
                city: "",
                state: "",
                pincode: "",
            })
    }

    submit = () => {
        let { selectedstore, phonenumber, subusername, storeselectid, storenameselected, selectedvpa } = this.state;
        let data = {

            sub_user_id: subuser_id,
            phone_number: phonenumber,
            name: subusername,

            store: {
                id: storeselectid,
                name: {
                    store: storenameselected
                }
            },
            // vpa_id: selectedvpa
        }

        if (subusername === "" || subusername === null) {
            toast.info("please enter the subuser name")
        }
        else if (subusername.length < 4) {
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
            patchApiCall(`subuser/update`, data,
                (response) => {
                    if (response.success) {
                        showToast("success", response.message);
                        this.removeFilter()
                        this.props.history.push({
                            pathname: `/subuser`,
                        });
                    }
                    else {
                        showToast("error", response.message);
                    }
                })
        }
    }

    inputdata = (event) => {

        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {

        let { Option } = Select;
        let { phonenumber, subusername, checkedstores, storenameselected, vpalist, selectedvpa } = this.state;
        console.log(this.state)

        return (
            <>

                <div className="home-section">
                    <div className="home-content">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-main-title main-color">Edit Sub User</div>
                                        <Link to="/subuser" className="btn default_btn m-l-10">
                                            <span>Back</span>
                                        </Link>
                                    </div>
                                    <div className="card-body">
                                        <form className="merchant-form">
                                            <div className="col-xs-12 p-0">
                                                <div className="form-group row">
                                                    <div className="col-xs-3">
                                                        <label className="store-form-label" htmlFor="subusername">Sub User Name</label>
                                                        <input className="form-control" name="subusername" value={subusername} type="text" onChange={(e) => this.inputdata(e)} />
                                                    </div>
                                                    <div className="col-xs-3">
                                                        <label className="store-form-label" htmlFor="Merchant-type">Sub User Mobile Number</label>
                                                        <input className="form-control" name="phonenumber" value={phonenumber} maxLength={10} type="text" onChange={(e) => this.onlynumber(e)} />
                                                    </div>

                                                </div>
                                                <div className="form-group row">

                                                    <div className="col-xs-3">
                                                        <label className="store-form-label" htmlFor="stores"> Select Store</label>

                                                        <Select

                                                            placeholder="Select Store To Replace"
                                                            value={storenameselected}
                                                            name="storelist"
                                                            onSelect={this.storeselect}
                                                            className="form-control"
                                                            removeIcon
                                                            allowClear
                                                            showArrow

                                                        >
                                                            {checkedstores?.map((storelist, i) =>
                                                                <Option value={JSON.stringify({ id: storelist.store_id, valuename: storelist?.name?.store })} >{storelist?.name?.store}</Option>
                                                            )}
                                                        </Select>

                                                    </div>


                                                    <div className="col-xs-3">
                                                        <label className="store-form-label" htmlFor="stores"> VPA List</label>

                                                        <Select

                                                            placeholder="VPA"
                                                            value={selectedvpa}
                                                            name="vpalist"
                                                            onSelect={this.vpaselect}
                                                            className="form-control"
                                                            removeIcon
                                                            allowClear
                                                            showArrow
                                                            notFoundContent="Please Select Store! (or) No VPA Available For The Selected Store"
                                                        >
                                                            <Option value="" disabled>Select VPA</Option>
                                                            {vpalist?.map((vpa, i) =>
                                                                <Option value={vpa?.vpa?.id} >{vpa?.vpa?.name}</Option>
                                                            )}
                                                        </Select>


                                                    </div>
                                                </div>

                                            </div>

                                            <div className="col-xs-12 p-0 btn-mt">
                                                <a className="btn btn-primary primary-btn" onClick={() => this.submit()} >Save & Continue</a>
                                            </div>
                                        </form>
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
