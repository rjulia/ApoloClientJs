import React, { Component } from "react";
import { Button} from "../Index.components";

class Pagination extends Component {
  state = {
    paginator: {
      pages: Math.ceil(Number(this.props.totalItems) / this.props.limit)
    }
  };
  render() {
    const { current } = this.props;
    const btnPrevious = (current > 1 ) ?  <li className="page-item">
    <Button 
      type={"button"}
      name={"PREVIOUS"}
      action={this.props.prevPage}
      classButton={"btn btn-success mr-1"}/></li> 
    : '';
    const btnNext = (current !== this.state.paginator.pages && Number(this.props.totalItems) > 0) ?  <li className="page-item">
    <Button 
      type={"button"} 
      classButton={"btn btn-success mr-1"}
      action={this.props.nextPage}
      name={"NEXT"}
      /></li> 
    : '';


    return (
      <div className="mt-5 d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            { btnPrevious }
            { btnNext }            
          </ul>
        </nav>
      </div>
    );
  }
}

export default Pagination;
