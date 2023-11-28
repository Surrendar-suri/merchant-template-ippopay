import React, { Component } from 'react'
export default class  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page:1,
    };
    console.log(props);
  }
  Next = () => {
      this.setState({page: this.state.page + 1},()=>
        this.props.handle(this.state.page)
      );
  };
  Previous = () => {
    if(this.state.page>1){
    this.setState(
      {
        page: this.state.page - 1,
      },()=>
    this.props.handle(this.state.page)
    );
    }
  };
    
render() {
    console.log(this.props.list,"list");
  return (
  
    
    <ul className="rc-pagination">
    <li  className="rc-pagination-prev">
        <a className={"rc-pagination-item-link"} onClick={() => this.Previous()}>{"<< Prev"}</a>
        </li>
        <li className="rc-pagination-next">
        {0 < this.props.list ? <a className="rc-pagination-item-link" onClick={() => this.Next()}>{"Next >>"}</a>:<a className="rc-pagination-item-link disabled_page" >{"Next >>"}</a>}
        </li>
    </ul>
  
  )
}
}