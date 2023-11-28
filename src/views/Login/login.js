import React, { Component } from "react";
import Logo from "../../images/ippostorelogin.svg";
import { showToast } from "../../Constants/Utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCookie, storageSetItem, getApiCall, postApiCall, getCookie } from "gfdu";
import cookie from "react-cookies";
import { Checkbox } from "antd";
import axios from "axios";
import ApiGateWay from "../../Constants/ApiCall";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            isPhone: true,
            otp: "",
            uniquecode: false,
            usertype: "merchant",
            uniquecodetext: "",

        };
    }

    //   componentDidMount(){
    //     this.getcsrf();
    //   }


    subuserlog = (e) => {
        console.log(e.target.checked)
        this.setState({ uniquecode: !this.state.uniquecode, usertype: e.target.checked ? "subuser" : "merchant" })

        if (e.target.checked == false) {
            this.setState({ uniquecodetext: "" })
        }

    }

    uniquetext = (e) => {

        this.setState({ uniquecodetext: e.target.value })
    }

    getcsrf = () => {
        ApiGateWay.get("login/get-token", (response) => {
            // console.log("response",response.data)
            setCookie("CsrfToken", response.data)

            window.location.href = "/dashboard"
        })

        //  axios({
        // url:'https://ippouat.ippopay.com/api/v1/merchant-panel/login/get-token', 
        // method:'get',
        // withCredentials:true,
        // headers:{
        //     "Content-Tye":"application/json",
        //     "Authorization":"Bearer "+getCookie('merchant_token')
        // }})
        // .then(function (response) {
        //     // handle success
        //     console.log(response.data);
        //     setCookie("CsrfToken",response.data.data)
        //     window.location.href = "/dashboard"
        // })
        // .catch(function (error) {
        //     // handle error
        //     console.log(error);
        // }) 




    }


    handleKeypress = (event) => {

        if (event.key === "Enter") {
            this.handleLogin()
        }
    }

    handleOtpKeyPress = (event) => {

        if (event.key === "Enter") {
            this.validateOtp()
        }
    }


    // Login Handler
    handleLogin = () => {
        let self = this;
        let { phone, usertype, uniquecodetext } = self.state;
        if (phone === "") {
            showToast("error", "Please Enter Valid Phone Number");
        } else {
            let data = {
                phone_number: phone,
                user_type: usertype,
                merchant_code: uniquecodetext
            };
            postApiCall("login/send-otp", data, (response) => {
                if (response.success) {
                    let { success } = response;
                    console.log(success);
                    if (success) {
                        this.setState({

                            isPhone: false,
                        });
                    }
                    showToast("success", response.message);
                } else {

                    console.log(response);
                    showToast("error", response.message);
                }
            });
        }
    };
    validateOtp = () => {
        let self = this;
        let { otp, phone, usertype, uniquecodetext } = self.state;
        if (otp === "") {
            showToast("error", "Please Enter Valid OTP");
        } else {
            let inputData = {
                phone_number: phone,
                verification_code: otp,
                user_type: usertype,
                merchant_code: uniquecodetext
            };
            postApiCall("login/verify", inputData, (response) => {
                if (response.success) {
                    console.log(response);
                    let { success, data } = response;
                    // showToast("success", response.message);
                    if (success) {
                        setCookie("merchantobject", JSON.stringify(data.merchant))
                        cookie.save("merchant_token", data.merchant.authtoken);
                        storageSetItem('merchant_detail', JSON.stringify(data.merchant))
                        storageSetItem('merchant_login', JSON.stringify(inputData))
                        this.getcsrf();
                    }
                } else {
                    console.log(JSON.parse(JSON.stringify(response)));
                    showToast("error", response.message);
                }
            });
        }
    };

    //Input Handler
    handleOnInputChange = (event) => {
        this.setState({

            [event.target.name]: event.target.value,
        });
    };

    handleChangeNumber = (e) => {
        let REGEX = /^\d+$/;
        if (e.target.value === "" || REGEX.test(e.target.value)) {
            this.setState(({
                [e.target.name]: e.target.value,
            }));
        }
    };

    render() {
        // let { phone, otp, isPhone } = this.state;
        let { uniquecode } = this.state;
        console.log(this.state)

        return (
            <>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
                {/* New Login  Design*/}
                <div className="login-img">
                    <div className="ip-page-login">
                        <div className="col-xs-12 text-center m-b-10">
                            <img style={{ height: "60px" }} src={Logo} />
                        </div>
                        <div className="container">
                            <div className="ip-wrapper">
                                <div className="form">
                                    <div className="title"><span>Merchant Login</span></div>
                                    <div className="title_desc"><span>Hey, Enter your details to get sign in<br /> to your account</span></div>
                                    {this.state.isPhone ?
                                        <div>
                                            <div className="form-group">
                                                <i className="fas fa-phone-alt" />
                                                <input placeholder="Enter Phone Number" value={this.state.phone} name="phone" onChange={this.handleChangeNumber} onKeyPress={this.handleKeypress} maxLength={10} />
                                            </div>
                                            <Checkbox className="subuser" onClick={(e) => this.subuserlog(e)} >Sub User Login</Checkbox>
                                            {uniquecode == true ?
                                                <div className="form-group form-group-top">
                                                    <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                                                    <input placeholder="Enter SubUser Unique Code" value={this.state.uniquecodetext} name="uniquecode" onChange={(e) => this.uniquetext(e)} onKeyPress={this.handleKeypress} />
                                                </div> : ""}
                                        </div>

                                        :
                                        <div className="form-group ">
                                            <i className="fas fa-key" />
                                            <input type="password" placeholder="Enter OTP" value={this.state.otp} name="otp" onChange={this.handleChangeNumber} onKeyPress={this.handleOtpKeyPress} />
                                        </div>
                                    }
                                    <div className="form-group login_button">
                                        <input type="button" onClick={this.state.isPhone ? this.handleLogin : this.validateOtp} defaultValue={this.state.isPhone ? "Send OTP" : "Login"} />
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
