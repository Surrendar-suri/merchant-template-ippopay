import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import tick from "../../images/green-tick.svg"
import { Link } from "react-router-dom";
export default class VPATransactionList extends Component {
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
                  <div className="card-body">
                    <div className="card-main-title m-b-10">VPA details</div>
                    <div className="row">
                      <div className="col-xs-12 p-0">
                        <div className="col-xs-3 ">
                          <div className="details_head">VPA name</div>
                          <div className="details_desc">GRT counter 1</div>
                        </div>
                        <div className="col-xs-3 ">
                          <div className="details_head">Branch name</div>
                          <div className="details_desc">T.Nagar</div>
                        </div>
                        <div className="col-xs-3 ">
                          <div className="details_head">VPA ID</div>
                          <div className="details_desc">abcd@axisbank</div>
                        </div>
                        <div className="col-xs-3 ">
                        </div>
                      </div>
                      <div className="col-xs-12 p-0">
                        <div className="col-xs-3 ">
                          <div className="details_head">Sub User name</div>
                          <div className="details_desc">Rajkumar</div>
                        </div>
                        <div className="col-xs-3 ">
                          <div className="details_head">Phone Number</div>
                          <div className="details_desc">+91 12345 67890</div>
                        </div>
                        <div className="col-xs-3 ">
                          <div className="details_head">BANK DETAILS</div>
                          <div className="details_desc">HDFC</div>
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
                            <th>DATE</th>
                            <th style={{ textAlign: "center" }}>Transaction ID</th>
                            <th>Transaction Amount</th>
                            <th>Payment Mode</th>
                            <th style={{ textAlign: "center" }}>Received</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><span className="table-data">09 Aug,22 10:08 PM</span></td>
                            <td style={{ textAlign: "center" }}><span className="table-data">123451</span></td>
                            <td><span className="table-data">₹ 120.00</span></td>
                            <td><span className="table-data">UPI</span></td>
                            <td style={{ textAlign: "center" }}><span><img src={tick} /></span></td>
                            <td><span className="view-button">view</span></td>
                          </tr>
                          <tr>
                            <td><span className="table-data">09 Aug,22 10:08 PM</span></td>
                            <td style={{ textAlign: "center" }}><span className="table-data">123451</span></td>
                            <td><span className="table-data">₹ 470.00</span></td>
                            <td><span className="table-data">Card</span></td>
                            <td style={{ textAlign: "center" }}><span className="table-data"><img src={tick} /></span></td>
                            <td><span className="view-button">view</span></td>
                          </tr>
                          <tr>
                            <td><span className="table-data">09 Aug,22 10:08 PM</span></td>
                            <td style={{ textAlign: "center" }}><span className="table-data">123451</span></td>
                            <td><span className="table-data">₹ 792.00</span></td>
                            <td><span className="table-data">UPI</span></td>
                            <td style={{ textAlign: "center" }}><span className="table-data"><img src={tick} /></span></td>
                            <td><span className="view-button">view</span></td>
                          </tr>
                          <tr>
                            <td><span className="table-data">09 Aug,22 10:08 PM</span></td>
                            <td style={{ textAlign: "center" }}><span className="table-data">123451</span></td>
                            <td><span className="table-data">₹ 982.00</span></td>
                            <td><span className="table-data">Cash</span></td>
                            <td style={{ textAlign: "center" }}><span className="table-data"><img src={tick} /></span></td>
                            <td><span className="view-button">view</span></td>
                          </tr>
                          <tr>
                            <td><span className="table-data">09 Aug,22 10:08 PM</span></td>
                            <td style={{ textAlign: "center" }}><span className="table-data">123451</span></td>
                            <td><span className="table-data">₹ 873.00</span></td>
                            <td><span className="table-data">UPI</span></td>
                            <td style={{ textAlign: "center" }}><span className="table-data"><img src={tick} /></span></td>
                            <td><span className="view-button">view</span></td>
                          </tr>
                          <tr>
                            <td><span className="table-data">09 Aug,22 10:08 PM</span></td>
                            <td style={{ textAlign: "center" }}><span className="table-data">123451</span></td>
                            <td><span className="table-data">₹450.00</span></td>
                            <td><span className="table-data">UPI</span></td>
                            <td style={{ textAlign: "center" }}><span className="table-data"><img src={tick} /></span></td>
                            <td><span className="view-button">view</span></td>
                          </tr>
                          <tr>
                            <td><span className="table-data">09 Aug,22 10:08 PM</span></td>
                            <td style={{ textAlign: "center" }}><span className="table-data">123451</span></td>
                            <td><span className="table-data">₹ 670.00</span></td>
                            <td><span className="table-data">UPI</span></td>
                            <td style={{ textAlign: "center" }}><span className="table-data"><img src={tick} /></span></td>
                            <td><span className="view-button">view</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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
