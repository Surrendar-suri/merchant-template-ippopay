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
// import OtpInput from 'react-otp-input';
import OtpInput from 'react18-input-otp';

export default class NewLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            isPhone: true,
            otp: "",
            uniquecode: false,
            usertype: "",
            uniquecodetext: "",
            otpscreen: false,
            wrongotp: false,
            resendotp: false

        };
    }

    // componentDidMount() {
    // }


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
    }

    otploadtime = (duration, display) => {
        let self = this;
        var timer = duration, minutes, seconds;
        var loadtimer = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = minutes + ":" + seconds;
            if (--timer < 0) {
                clearInterval(loadtimer);
                self.setState({ resendotp: true });
            }
        }, 1000);

    }
    handleKeypress = (event, utype) => {
        if (event.key === "Enter") {
            this.handleLogin(utype)
        }
    }

    handleOtpKeyPress = (event, utype) => {

        if (event.key === "Enter") {
            this.validateOtp(utype)
        }
    }


    // Login Handler
    handleLogin = (utype) => {
        console.log(utype)
        this.setState({ usertype: utype })
        let self = this;
        let { phone, usertype, uniquecodetext } = self.state;
        if (!phone.match(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d$/gm)) {
            showToast("error", "Please Enter Valid Phone Number");
        } else {
            let data = {
                phone_number: phone,
                user_type: utype,
                merchant_code: uniquecodetext
            };
            postApiCall("login/send-otp", data, (response) => {
                if (response.success) {
                    let { success } = response;
                    console.log(success);
                    if (success) {
                        this.setState({
                            otpscreen: true,
                            resendotp: false
                        }, () => {
                            var display = document.querySelector('#loadtimer');
                            this.otploadtime(60 * 1.5, display)
                        });
                    }
                    showToast("success", response.message);
                } else {
                    console.log(response);
                    showToast("error", response.message === "must provide valid merchant_code" ? "Enter The Valid Unique Code" : response.message);

                }
            });
        }
    };
    validateOtp = (utype) => {
        console.log(utype)
        this.setState({ usertype: utype })
        let self = this;
        let { otp, phone, usertype, uniquecodetext } = self.state;
        if (otp === "") {
            showToast("error", "Please Enter Valid OTP");
        } else {
            let inputData = {
                phone_number: phone,
                verification_code: otp,
                user_type: utype,
                merchant_code: uniquecodetext
            };
            postApiCall("login/verify", inputData, (response) => {
                if (response.success) {
                    console.log(response);
                    let { data } = response;
                    showToast("success", "Secure Login Success");
                    if (response.success) {
                        setCookie("merchantobject", JSON.stringify(data.merchant))
                        cookie.save("merchant_token", data.merchant.authtoken);
                        storageSetItem('merchant_detail', JSON.stringify(data.merchant))
                        storageSetItem('merchant_login', JSON.stringify(inputData))
                        this.getcsrf();
                    }
                } else {
                    console.log(JSON.parse(JSON.stringify(response)));
                    showToast("error", response.message);
                    if (response.message === "Invalid OTP") {
                        this.setState({ wrongotp: true })
                    }
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


    submit = () => {
        this.setState({ otpscreen: !this.state.otpscreen, otp: "" })

    }
    handleChange = (otpvalue) => {

        this.setState({ otp: otpvalue, wrongotp: false });
    }


    render() {
        // let { phone, otp, isPhone } = this.state;
        let { uniquecode, otpscreen, phone, usertype } = this.state;

        console.log(this.state)

        return (
            <>
                {/* 
                <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                    theme="dark"
                /> */}
                <section className="login-sec" >
                    <div className="row">
                        <div className="col-sm-6 pd-0">
                            <div className="left-img-section">
                                <div className="login-left-section">
                                    <img className="logo-filter" src={Logo}></img>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 pd-0">
                            {otpscreen == false ?
                                <div className="right-form-section">

                                    <div className="welcome-msg"> Welcome Back Merchant !</div>
                                    <div className="detail-msg">Enter Your Details To Get Sign In To Your Account</div>

                                    <div className="profile-width">
                                        <div className="profile-tabs">

                                            <ul className="tab-list">
                                                <li className="active">
                                                    <span data-toggle="tab" href="#section-bar-1" className="merchant-tabs" aria-expanded="true">Merchant Login</span>
                                                </li>

                                                <li>
                                                    <span data-toggle="tab" href="#section-bar-2" className="merchant-tabs ml-3">SubUser Login</span>
                                                </li>
                                            </ul>

                                            {/* <span className="ml-log">Merchant Login</span>
                                <span className="sb-log">Subuser Login </span> */}
                                        </div>
                                    </div>
                                    <div className="tab-content">
                                        <div className="form merchant-form tab-pane fade active in" id="section-bar-1">
                                            <div className="mob-num">
                                                <p>MOBILE NUMBER</p>
                                                <input type="text" className="mobnum-textbox" value={this.state.phone} name="phone" onChange={this.handleChangeNumber} onKeyPress={(e) => this.handleKeypress(e, "merchant")} maxLength={10} placeholder="Enter Your Mobile Number" />
                                            </div>
                                            <a className="sub-btn" >
                                                <div className="sub-button">
                                                    <p className="sub-padding" onClick={() => this.handleLogin("merchant")}>Send OTP</p>
                                                </div>
                                            </a>
                                        </div>

                                        <div className="form merchant-form fade tab-pane" id="section-bar-2">
                                            <div className="mob-num">

                                                <p>MOBILE NUMBER</p>
                                                <input type="text" className="mobnum-textbox" value={this.state.phone} name="phone" onChange={this.handleChangeNumber} onKeyPress={(e) => this.handleKeypress(e, "subuser")} maxLength={10} placeholder="Enter Your Mobile Number" />

                                            </div>
                                            <div className="uni-code">
                                                <p>UNIQUE CODE</p>

                                                <input placeholder="Enter The Shop Unique Code" className="mobnum-textbox" value={this.state.uniquecodetext} name="uniquecode" onChange={(e) => this.uniquetext(e)} onKeyPress={(e) => this.handleKeypress(e, "subuser")} />
                                            </div>

                                            <a className="sub-btn" >
                                                <div className="sub-button">
                                                    <div onClick={() => this.handleLogin("subuser")} className="sub-padding">Login</div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div> :

                                <div className="otp-screen-section">
                                    <div className="welcome-msg">
                                        Enter Your Verification Code
                                    </div>
                                    <div className="detail-msg">
                                        We sent a verification code to {phone}
                                        <a className="edit-button" onClick={() => this.submit()}><i className="fe fe-edit"></i> Edit</a>
                                    </div>
                                    <div className="verify-code">
                                        <p>VERIFICATION CODE</p>
                                        <div className="otpbox">
                                            <div className="row">
                                                <div id="otp" className="col-md-6 ">
                                                    <OtpInput
                                                        className="otp-input-box"
                                                        inputStyle="remove-border otp-spaces"
                                                        containerStyle="otp-spaces"
                                                        shouldAutoFocus
                                                        isInputNum
                                                        errorStyle="errorotp"
                                                        // isInputSecure="true"
                                                        hasErrored={this.state.wrongotp}
                                                        value={this.state.otp}
                                                        onChange={this.handleChange}
                                                        numInputs={4}
                                                        onSubmit={() => this.validateOtp(this.state.usertype)} />

                                                </div>
                                            </div>

                                        </div>
                                        <p className="resendotp">
                                            <p>You can Resend OTP in  <span id="loadtimer" className="ttp_time">01:30</span></p>
                                            {this.state.resendotp ?
                                                <a  className="edit-button" onClick={() => this.handleLogin(usertype)}><i style={{fontSize:"15px",display:"inline-block",verticalAlign:"sub"}} className="bx bx-reset"></i> Resend OTP</a> : ""}
                                        </p>
                                    </div>
                                    <a className="sub-btn">
                                        <div className="sub-button">
                                            <div className="sub-padding" type="submit" onClick={() => this.validateOtp(usertype)}>Login</div>
                                        </div>
                                    </a>
                                </div>
                            }
                        </div>
                    </div>
                </section>


            </>
        );
    }
}
