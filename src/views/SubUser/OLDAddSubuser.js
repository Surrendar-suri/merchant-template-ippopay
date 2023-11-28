import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import tick from "../../images/green-tick.svg"
import { Link } from "react-router-dom";
import { getApiCall, postApiCall, getCookie } from "gfdu";
import axios from "axios";
import "antd/dist/antd.css";

import { Modal, Select, AutoComplete } from "antd"
export default class AddSubuser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarToggle: true,
            storelist: [],
            storeselectid :""

        };
    }


    componentDidMount() {
        this.storelist()
    }


    //   inputdata = (event)=>{
    //    ({[event.target.name]: event.target.value}) 
    //   }

    inputdata = (event) => {
        this.setState({

            [event.target.name]: event.target.value,
        });
    };




    storelist = () => {
        ApiGateWay.get(`store/list`, (response) => {
            this.setState({ storelist: response.data })
        })
    }



    storeselect = (id)=>{
           this.setState({storeselectid:id})
    }



    handlesubmit = () => {

        let { subusername, phonenumber, storelist ,storeselectid} = this.state;
        console.log(subusername ,phonenumber,storeselectid )
        let data = {
            phone: {
                country_code: "91",
                national_number: phonenumber
            },
            merchant: {
                id: storeselectid,
                name: subusername
            },
            store: {
                id: storeselectid,
                name: {
                    store: subusername
                }
            },
            name:subusername

        }
        axios({
            // url: 'https://ippouat.ippopay.com/api/v1/merchant-panel/subuser/create',
            url: 'https://storeapi.ippopay.com/api/v1/merchant-panel/subuser/create',
            method: 'post',
            withCredentials: true,
            data: data,
            headers: {
                "Content-Tye": "application/json",
                "Authorization": "Bearer " + getCookie('merchant_token'),
                "xsrf-token": getCookie('CsrfToken'),


            }
        })
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.error(error);
            })
        /* ApiGateWay.post(`subuser/create`, data, (response) => {
            console.log(response)
        }) */
    }



    render() {

        let { subusername, phonenumber, storelist } = this.state;
        const { Option } = Select;


        console.log(this.state)
        return (
            <>
                <div className="home-section">
                    <div className="home-content">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-main-title main-color">Sub User Details</div>
                                        <button className="btn default_btn m-l-10">
                                            <span>Back</span>
                                        </button>
                                    </div>
                                    <div className="card-body">
                                        <form className="merchant-form">
                                            <div className="col-xs-12 p-0">
                                                <div className="form-group row">
                                                    <p className="col-xs-12 add-list">#1</p>
                                                    <div className="col-xs-3">
                                                        <label className="store-form-label" htmlFor="name">sub-USER name</label>
                                                        <input className="form-control" name="subusername" type="text" value={subusername} onChange={(e) => this.inputdata(e)} />
                                                    </div>
                                                    <div className="col-xs-3">
                                                        <label className="store-form-label" htmlFor="Merchant-type">sub-USER mobile number</label>
                                                        <input className="form-control" name="phonenumber" type="text" value={phonenumber} onChange={(e) => this.inputdata(e)} />
                                                    </div>
                                                    <div className="col-xs-3">
                                                        <label className="store-form-label" htmlFor="Merchant-type">store name </label>

                                                        <Select
                                                            
                                                            placeholder="Store List"
                                                            // value={this.state.productname}
                                                           
                                                            name="storelist"
                                                           onSelect={this.storeselect}
                                                           className="form-control"
                                                            removeIcon
                                                            allowClear
                                                            showArrow

                                                        >
                                                            {storelist.map((storelist) =>

                                                                <Option value={storelist.store_id}>{storelist?.name?.store}</Option>)},
                                                        </Select>


                                                    </div>
                                                    {/* <div className="col-xs-3">
                                                        <label className="store-form-label" htmlFor="id">vpa name</label>
                                                        <select className="form-control" id="Merchant-type">
                                                            <option>Counter-4, Counter-3</option>
                                                            <option>Counter-1</option>
                                                        </select>
                                                    </div> */}
                                                </div>
                                            </div>
                                          
                                            {/* <div className="col-xs-12 row">
                                                <p className="add-list" style={{ cursor: "pointer" }}>+ Add Another Store</p>
                                            </div> */}
                                            <div className="col-xs-12 p-0 btn-mt">
                                                <Link className="btn btn-primary primary-btn" onClick={this.handlesubmit} >Save & Continue</Link>
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
