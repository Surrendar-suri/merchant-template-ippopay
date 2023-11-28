import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import tick from "../../images/green-tick.svg"
import { Link } from "react-router-dom";
import { Checkbox } from "antd";
import { postApiCall, getCookie, getApiCall, patchApiCall } from "gfdu";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isInvalidName, showToast } from "../../Constants/Utils";
import Loader from "../../components/Loader";

let filter_options = {}
let storefiltername = {}
let selectedstores = [];
// let detailsselectedstore = [];
let submerchant_id;

export default class EditSubmerchant extends Component {
    constructor(props) {
        super(props);
        submerchant_id = this.props.match.params.id;
        this.state = {
            sidebarToggle: true,
            storelist: [],
            selectedstores: [],
            checkedstores: [],
            storeobj: [],
            detailsselectedstore: [],
            loading: true,
        };
    }
    componentDidMount() {
        this.details();
    }

    details = () => {

        getApiCall(`sub-merchant/detail/${submerchant_id}`,
            (response) => {
                if (response.success) {
                    this.setState({ details: response.data })
                    let details = response.data;

                    this.setState({
                        loading: false,
                        name: details?.name?.full,
                        phonenumber: details?.phone?.national_number,
                        email: details?.email?.primary,
                        street: details?.location?.agent_store?.street_name,
                        area: details?.location?.agent_store?.area,
                        city: details?.location?.agent_store?.city,
                        state: details?.location?.agent_store?.state,
                        pincode: details?.location?.agent_store?.pincode,
                        detailsselectedstore: response.data.stores,
                        storeobj: response.data.stores,


                    }, () => {
                        this.storelist();
                        selectedstores = this.state.detailsselectedstore;
                    })
                    console.log(this.state.detailsselectedstore)
                }
                else {
                    this.setState({ loading: false })
                    showToast("error", response.message);
                }

            })
    }
    storelist = () => {

        ApiGateWay.get(`store/list`, (response) => {
            this.setState({ storelist: response.data, loading: false }, () => {
                this.selectedstores();
            })
        })
    }

    selectedstores = () => {
        let { storelist, detailsselectedstore } = this.state
        console.log(detailsselectedstore, "selected")

        const obj = detailsselectedstore.reduce((o, v) => (o[v?.store_id] = true, o), {})
        const output = storelist.map(v => ({ ...v, matchingResult: obj[v.store_id] || false }))
        console.log(output, "output")
        this.setState({ checkedstores: output })
        console.log(output, "output")
    }
    // storecheck = (event) => {
    //     console.log(event.target.name)
    //     console.log(event.target.value, "console")
    //     let storedata = JSON.parse((event.target.value))
    //     if (event.target.checked === true) {
    //         let obj = {
    //             index: event.target.name,
    //             store_id: storedata.id,
    //             store_name: storedata.name
    //         }
    //         selectedstores.push(obj)
    //     }
    //     else if (event.target.checked === false) {
    //         const indexOfObject = selectedstores.findIndex(object => {
    //             return object.index === event.target.name;
    //         });
    //         selectedstores.splice(indexOfObject, 1);
    //         console.log(selectedstores);
    //     }
    //     this.setState({
    //         storeobj: selectedstores
    //     });
    // }

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
        console.log("selectedstores", selectedstores);
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
        // var selectedstorearray = Object.values(this.state.selectedstores);

        let { name, phonenumber, email, street, area, city, state, pincode, storeobj } = this.state;
        console.log(storeobj)
        let merchantdetails = JSON.parse(getCookie("merchantobject"));

        let data = {

            sub_merchant_id: submerchant_id,
            name: {
                full: name,
                store: "",
                display: ""
            },
            phone_number: phonenumber,
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
        if (name === "" || name === null) {
            toast.info("please enter the name")
        }
        else if (name.length < 4) {
            toast.info("Please enter the name minimum 4 characters");
        }
        else if (isInvalidName(name)) {
            toast.info(
                "Please enter the name in alphabets only "
            );
        }
        else if (!phonenumber.match(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d$/gm)) {
            toast.info("please enter valid mobile number");
        }
        else if (!email.match(/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
            toast.info("Please Enter valid Email")
        }
        else if (storeobj.length <= 0) {
            toast.info("Please Select Atleast One Store")
        }
        else {
            this.setState({ loading: true });
            patchApiCall(`sub-merchant/update`, data,
                (response) => {
                    if (response.success) {
                        this.setState({ loading: false })
                        showToast("success", response.message);
                        this.removeFilter()
                        this.props.history.push({
                            pathname: `/submerchant`,
                        });
                    }
                    else {
                        this.setState({ loading: false })
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
        let arr = []
        let { name, phonenumber, email, street, area, city, state, pincode, checkedstores, detailsselectedstore } = this.state;
        console.log(checkedstores)

        return (
            <>
                {this.state.loading && <Loader />}
                <div className="home-section">
                    <div className="home-content">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-main-title main-color">Edit Sub Merchant Details</div>
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
                                                        <input className="form-control" name="phonenumber" value={phonenumber} type="text" onChange={(e) => this.inputdata(e)} />
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
                                                        <input className="form-control" name="pincode" value={pincode} type="text" onChange={(e) => this.inputdata(e)} />
                                                    </div>
                                                </div>
                                                <div className="info-detail">
                                                    Select Stores
                                                </div>
                                                <div className="form-group row">

                                                    <div className="col-xs-12">
                                                        {/* {arr.forEach(o => {
                                                        if (this.state.detailsselectedstore.some(slot => slot === o.stores)) {
                                                            o.checked = true;
                                                            arr.push(o);
                                                            this.setState({arrval :arr})
                                                        } else {
                                                            o.checked = false;
                                                            arr.push(o);
                                                        }
                                                        }) */}
                                                        {checkedstores.length > 0 ? (
                                                            checkedstores.map((store, i) => (

                                                                <Checkbox className="checkbox_stores" name={i} value={store} onChange={(e) => this.storecheck(e)} defaultChecked={store?.matchingResult}>{store?.name?.full === "" ? store?.name?.store : store?.name?.full}</Checkbox>
                                                                // this.setState({storelistarray:storelistarray})

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
