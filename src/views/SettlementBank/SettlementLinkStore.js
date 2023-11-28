import React, { Component } from "react";
import ApiGateWay from "../../Constants/ApiCall";
import tick from "../../images/green-tick.svg"
import { Link } from "react-router-dom";
export default class SettlementLinkStore extends Component {
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
                    <div className="card-main-title m-b-10">Bank details</div>
                    <div className="row">
                      <div className="col-xs-12 p-0">
                        <div className="col-xs-3 ">
                          <div className="details_head">Bank Name</div>
                          <div className="details_desc">State Bank</div>
                        </div>
                        <div className="col-xs-3 ">
                          <div className="details_head">branch name</div>
                          <div className="details_desc">Amanjikarai</div>
                        </div>
                        <div className="col-xs-3 ">
                          <div className="details_head">IFSC NUmber</div>
                          <div className="details_desc">uTIB0875543</div>
                        </div>
                        <div className="col-xs-3 ">
                        </div>
                      </div>
                      <div className="col-xs-12 p-0">
                        <div className="col-xs-3 ">
                          <div className="details_head">Account number </div>
                          <div className="details_desc">98765290012873</div>
                        </div>
                        <div className="col-xs-6 ">
                          <div className="details_head">Account holder Name </div>
                          <div className="details_desc">Surendar</div>
                        </div>
                        <div className="col-xs-3 ">
                          <a className="view-link"><span>View more</span><i className="bx bx-chevron-right bx-sm"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-header">
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
                            <th style={{ textAlign: "center" }}>Store ID</th>
                            <th>Store Name</th>
                            <th>Branch Location</th>
                            <th>Merchant Name</th>
                            <th>VPA Counts</th>
                            <th>Store Category</th>
                            <th>Transaction</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ textAlign: "center" }}><span className="table-data">123451</span></td>
                            <td><span className="table-data">GRT</span></td>
                            <td><span className="table-data">No 23, Avadi</span></td>
                            <td><span className="table-data">Nirmal</span></td>
                            <td><span className="table-data">20</span></td>
                            <td><span className="table-data">Jewellery</span></td>
                            <td><span className="view-button">view</span></td>
                          </tr>
                          <tr>
                            <td style={{ textAlign: "center" }}><span className="table-data">123451</span></td>
                            <td><span className="table-data">GRT</span></td>
                            <td><span className="table-data">GRT ground Floor</span></td>
                            <td><span className="table-data">Surendar</span></td>
                            <td><span className="table-data">45</span></td>
                            <td><span className="table-data">Jewellery</span></td>
                            <td><span className="view-button">view</span></td>
                          </tr>
                          <tr>
                            <td style={{ textAlign: "center" }}><span className="table-data">123451</span></td>
                            <td><span className="table-data">GRT</span></td>
                            <td><span className="table-data">GRT ground Floor</span></td>
                            <td><span className="table-data">Ranjith</span></td>
                            <td><span className="table-data">56</span></td>
                            <td><span className="table-data">Jewellery</span></td>
                            <td><span className="view-button">view</span></td>
                          </tr>
                          <tr>
                            <td style={{ textAlign: "center" }}><span className="table-data">123451</span></td>
                            <td><span className="table-data">GRT</span></td>
                            <td><span className="table-data">GRT ground Floor</span></td>
                            <td><span className="table-data">Nithish</span></td>
                            <td><span className="table-data">74</span></td>
                            <td><span className="table-data">Jewellery</span></td>
                            <td><span className="view-button">view</span></td>
                          </tr>
                          <tr>
                            <td style={{ textAlign: "center" }}><span className="table-data">123451</span></td>
                            <td><span className="table-data">GRT</span></td>
                            <td><span className="table-data">GRT ground Floor</span></td>
                            <td><span className="table-data">Udhaya</span></td>
                            <td><span className="table-data">38</span></td>
                            <td><span className="table-data">Jewellery</span></td>
                            <td><span className="view-button">view</span></td>
                          </tr>
                          <tr>
                            <td style={{ textAlign: "center" }}><span className="table-data">123451</span></td>
                            <td><span className="table-data">GRT</span></td>
                            <td><span className="table-data">GRT ground Floor</span></td>
                            <td><span className="table-data">Farook</span></td>
                            <td><span className="table-data">28</span></td>
                            <td><span className="table-data">Jewellery</span></td>
                            <td><span className="view-button">view</span></td>
                          </tr>
                          <tr>
                            <td style={{ textAlign: "center" }}><span className="table-data">123451</span></td>
                            <td><span className="table-data">GRT</span></td>
                            <td><span className="table-data">GRT ground Floor</span></td>
                            <td><span className="table-data">Nirmal</span></td>
                            <td><span className="table-data">73</span></td>
                            <td><span className="table-data">Jewellery</span></td>
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
