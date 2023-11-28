
import MainRouter from "./routes/MainRouter";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Routes from "./routes/Router";
import { initializeApiCall, getCookie, deleteAllCookies, reloadWindow,getApiCall,setCookie } from "gfdu";
import lockimg from "./images/lock.svg"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "./Constants/Utils";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locked : false,
            pluginsheaders:false
        }
    }
    
    componentDidMount(){
        this.autorun();
     }

    newcsrf= ()=>{
        getApiCall("login/get-token", (response) => {
            setCookie("CsrfToken", response.data);
            this.setState({locked :!this.state.locked}, () => {
                this.autorun();
                //reloadWindow();
            })
        });
    }
   

    autorun = ()=>{
        initializeApiCall({
            "Content-Tye": "application/json",
            "Authorization": "Bearer " + getCookie('merchant_token'),
            "x-csrf-token": getCookie('CsrfToken'),
        
        }, "https://storeapi.ippopay.com/api/v1/merchant-panel/", true, [{ status_code: '401', func: () => (deleteAllCookies(), reloadWindow()) }, 
            {
            status_code: '406', func: () => {
                this.setState({locked :true})
            }
        }]);
        this.setState({pluginsheaders:true});
    }


    render() {
        let {locked} =this.state;
        return (
            <>
            <div className={locked===true?"lock-screen-blur":""}>
            <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
            theme="dark"
        />
        {this.state.pluginsheaders &&
            <Router>
                <Route render={(history) =>  
                <Routes loc={history} />
                }/>
            </Router>}
            </div>
            
            {locked===true?
            <div className="lock-screen">
                <div className="ip-lock-wrapper">
                    <div className="ip-lock-content">
                        <img className="ip-lock-head" src={lockimg}/>
                        <div className="ip-lock-head">Dashboard Locked</div>
                        <div className="ip-lock-desc">Your Panel Have Been Locked Due To Security Threat.</div>
                        <span  onClick={()=>this.newcsrf()} className="btn btn-primary lock-btn">Unlock it!</span>
                    </div>
                </div>
            </div>:""}
            </>
        );
    }

}