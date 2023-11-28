import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import tick from "../../images/green-tick.svg"
import { Link } from "react-router-dom";
import uploadimg from "../../images/upload-img.svg";
export default class AddSettlementBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarToggle: true,
    };
  }
  componentDidMount() {
  }

  render() {
    return (
      <>
        <div className="home-section">
          <div className="home-content">
            <div className="row">
              <div className="col-xs-12">
                <div className="card">
                  <div className="card-header">
                    <div className="card-main-title main-color">Bank Details</div>
                    <button className="btn default_btn m-l-10">
                      <span>Back</span>
                    </button>
                  </div>
                  <div className="card-body">
                    <form className="merchant-form">
                    <div className="col-xs-12 p-0">
                      <div className="form-group row">
                        
                        <div className="col-xs-3">
                          <label className="store-form-label" htmlFor="Merchant-type">Bank Name</label>
                          <select className="form-control" id="Merchant-type">
                            <option>HDFC BANK</option>
                            <option>SBI BANK</option>
                          </select>
                        </div>
                        <div className="col-xs-3">
                          <label className="store-form-label" htmlFor="name">BRANCH NAME</label>
                          <input className="form-control" id="name" type="text" value="ARUMBAKKAM" />
                        </div>
                        <div className="col-xs-3">
                          <label className="store-form-label" htmlFor="name" value="uTIB0875543">ifsc nUMBER</label>
                          <input className="form-control" id="name" type="text" value="UTIB0875543" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-xs-3">
                          <label className="store-form-label" htmlFor="name">account holder NAME</label>
                          <input className="form-control" id="name" type="text" value="Surendar" />
                        </div>
                        <div className="col-xs-3">
                          <label className="store-form-label" htmlFor="name">account nUMBER</label>
                          <input className="form-control" id="name" type="text" value="98765290012876" />
                        </div>
                        <div className="col-xs-3">
                          <label className="store-form-label" htmlFor="name">confirm account nUMBER</label>
                          <input className="form-control" id="name" type="text" value="98765290012876" />
                        </div>
                      </div>
                     
                    </div>
                  
                    <div className="col-xs-12 p-0 btn-mt">
                      <Link className="btn btn-primary primary-btn">Save & Continue</Link>
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
