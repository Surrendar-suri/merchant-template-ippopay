import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import tick from "../../images/green-tick.svg"
import { Link } from "react-router-dom";
import { Checkbox } from "antd";
import { postApiCall, getCookie } from "gfdu";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isInvalidName, showToast } from "../../Constants/Utils";


let selectedstores = [];
export default class AddSubmerchant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarToggle: true,
            storelist: {},
            //selectedstores: {},
            pincode: "",
            phonenumber: "",
            email: "",
            name: ""
        };
    }
    componentDidMount() {
        this.storelist()
    }


    onlynumber = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ [e.target.name]: e.target.value })
        }
    };



    storelist = () => {
        selectedstores = [];
        ApiGateWay.get(`store/list`, (response) => {
            this.setState({ storelist: response.data, loading: false })
        })
    }

    storecheck = (event) => {
        var checkedobj = event.target.value;
        var checked = event.target.checked;
        var checkedStore = { store_id: checkedobj.store_id, store_name: checkedobj?.name?.store };
        if (checked) {
            var store = { store_id: checkedobj.store_id, store_name: checkedobj?.name?.store };
            selectedstores.push(store);
        } else {
            selectedstores = selectedstores.filter(element => {
                if (element.store_id !== checkedStore.store_id) {
                    return true;
                }
                return false;
            });
        }
        console.log("selectedstores", selectedstores);
        this.setState({
            storeobj: selectedstores
        });
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
        let { name, phonenumber, email, street, area, city, state, pincode, storelist, storeobj } = this.state;
        let merchantdetails = JSON.parse(getCookie("merchantobject"));


        let data = {

            merchant_id: merchantdetails.merchant_id,
            name: {
                full: name,
                display: ""
            },
            phone: {
                national_number: phonenumber
            },
            email: email,
            stores: storeobj,
            terms: true,
            location: {
                agent_store: {
                    street_name: street,
                    area: area,
                    city: city,
                    state: state,
                    pincode: pincode
                }
            }
        }
        // merchantdetails.Store_name
        if(name==="" || name===null){
            toast.info("please enter the name")
        }
        else if(name.length<4){
            toast.info("Please enter the name minimum 4 characters");
        }
        else if (isInvalidName(name)) {
            toast.info(
                "Please enter the name in alphabets only "
            );
        }
        else if (phonenumber === "" || phonenumber === null) {
            toast.info("Please enter the phone number");
        }
        else if (!phonenumber.match(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d$/gm)) {
            toast.info("please enter valid mobile number");
        }
        else if (email === "" || email === null) {
            toast.info("Please enter the email address")
        }
        else if (!email.match(/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
            toast.info("Please Enter valid Email")
        }
        else if (!storeobj) {
            toast.info("Please Select Atleast One Store")
        }
        else {
            postApiCall(`sub-merchant/create`, data,
                (response) => {
                    if (response.success) {
                        showToast("success", response.message);
                        this.removeFilter()
                        this.props.history.push({
                            pathname: `/submerchant`,
                        });
                    }
                    else {
                        showToast("error", response.message);
                        // this.removeFilter()
                    }
                })
        }
    }

    inputdata = (event) => {
        console.log(event)
        this.setState({
            [event.target.name]: event.target.value,
        });
    };


    render() {
        console.log(this.state.selectedstores, "store");

        console.log(this.state.storeobj);

        let { name, phonenumber, email, street, area, city, state, pincode, storelist } = this.state;

        return (
            <>

                <div className="home-section">
                    <div className="home-content">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="card">
                                    <div className="detail_card_header">
                                        <div className="card-main-title main-color">Add Sub Merchant</div>
                                        <Link to="/submerchant" className="btn default_btn m-l-10">
                                            <span>Back</span>
                                        </Link>
                                    </div>
                                    <div className="card-body">
                                        <form className="merchant-form">
                                            <div className="col-xs-12 p-0">
                                                <div className="form-group row">

                                                    <div className="col-xs-3">
                                                        <label className="store-form-label" htmlFor="name">Sub Merchant Name</label>
                                                        <input className="form-control" name="name" value={name} type="text" onChange={(e) => this.inputdata(e)} />
                                                    </div>
                                                    <div className="col-xs-3">
                                                        <label className="store-form-label" htmlFor="Merchant-type">Sub Merchant Mobile Number</label>
                                                        <input className="form-control" name="phonenumber" value={phonenumber} type="text" maxLength={10} onChange={(e) => this.onlynumber(e)} />
                                                    </div>
                                                    <div className="col-xs-3">
                                                        <label className="store-form-label" htmlFor="Merchant-type">Email</label>
                                                        <input className="form-control" name="email" value={email} type="email" onChange={(e) => this.inputdata(e)} />
                                                    </div>



                                                </div>
                                                <div className="info-detail">
                                                    Contact Address
                                                </div>
                                                <div className="form-group row">

                                                    <div className="col-xs-3">
                                                        <label className="store-form-label" htmlFor="name">Street</label>
                                                        <input className="form-control" name="street" value={street} type="text" onChange={(e) => this.inputdata(e)} />
                                                    </div>
                                                    <div className="col-xs-3">
                                                        <label className="store-form-label" htmlFor="Merchant-type">Area</label>
                                                        <input className="form-control" name="area" value={area} type="text" onChange={(e) => this.inputdata(e)} />
                                                    </div>
                                                    <div className="col-xs-3">
                                                        <label className="store-form-label" htmlFor="Merchant-type">City</label>
                                                        <input className="form-control" name="city" value={city} type="text" onChange={(e) => this.inputdata(e)} />
                                                    </div>
                                                    <div className="col-xs-3">
                                                        <label className="store-form-label" htmlFor="Merchant-type">State</label>
                                                        <input className="form-control" name="state" value={state} type="text" onChange={(e) => this.inputdata(e)} />
                                                    </div>




                                                </div>

                                                <div className="form-group row">
                                                    <div className="col-xs-3">
                                                        <label className="store-form-label" htmlFor="Merchant-type">Pin Code</label>
                                                        <input className="form-control" name="pincode" value={pincode} maxLength={6} type="text" onChange={(e) => this.onlynumber(e)} />
                                                    </div>

                                                </div>
                                                <div className="info-detail">
                                                    Select Stores
                                                </div>
                                                <div className="form-group row">

                                                    <div className="col-xs-12">
                                                        {storelist.length > 0 ? (
                                                            storelist.map((store, i) => (
                                                                <Checkbox className="checkbox_stores" name={'store' + i} value={store} onChange={(e) => this.storecheck(e)}>{store?.name?.full === "" ? store?.name?.store : store?.name?.full}</Checkbox>
                                                            ))
                                                        ) : "No Store"}


                                                    </div>
                                                </div>
                                            </div>




                                            <div className="col-xs-12 p-0 btn-mt">
                                                <a className="btn btn-primary primary-btn" onClick={this.submit} >Save & Continue</a>
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
