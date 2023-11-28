import React, { Component } from "react";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    return (
      <>
        <footer className="footer">
          <div className="container">
            <div className="row align-items-center flex-row-reverse">
              <div className="col-md-12 col-sm-12 text-center">
                <span className="footer-btm">
                  {" "}
                  Copyright © {(new Date().getFullYear())} <a href="#">IppoPay</a>. Designed with{" "}
                  <span className="fa fa-heart text-danger"></span> by{" "}
                  <a href="#">IppoPay</a> All rights reserved.
                </span>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
}
