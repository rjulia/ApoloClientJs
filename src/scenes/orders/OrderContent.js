import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Animated from 'react-select/lib/animated';
import { Title } from "../../components/Index.components";
import { Table } from "../index.scenes";




class OrderContentList extends Component {
  state = {
    selectedOption: [],
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  render() {
    const { selectedOption } = this.state;

    
  
    return (
      <Fragment>
        <Title heading={4} title="Products" />
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          isMulti={true}
          options={this.props.products}
          components={Animated()}
          placeholder={"Select products"}
          getOptionValue={(options) => options.id}
          getOptionLabel={(options) => options.name}

        />
        <Table products={this.state.selectedOption}/> 
        

      </Fragment>
    );
  }
}

export default OrderContentList;