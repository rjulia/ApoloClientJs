import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Animated from 'react-select/lib/animated';
import { Title } from "../../components/Index.components";
import { Table, GeneratorOrder } from "../index.scenes";

class OrderContentList extends Component {

  state = {
    products: [],
    total: 0
  }

  handleChange = (products) => {
    this.setState({ products });
   
  }
  updataeTotal = () => {
    const products = this.state.products;

    if(products.length === 0 ){
      this.setState({
        total: 0
      });
      return;
    }
    let nuevoTotal = 0;

    products.map(product => nuevoTotal += (product.quantity * product.price));
    this.setState({
      total: nuevoTotal
    })

  }

  updateQuantity = (quantity, idx) => {
    const products = this.state.products;

    products[idx].quantity = Number(quantity);

    this.setState({
      products
    }, () =>{
      this.updataeTotal();
    });

  }
  deleteProduct = (id) => {
    const products = this.state.products;

    const productsRest = products.filter(pro => pro.id !== id)

    this.setState({
      products: productsRest
    },() =>{
      this.updataeTotal();
    });
  }

  render() {
    const { products } = this.state;
 
    return (
      <Fragment>
        <Title heading={4} title="Products" />
        <Select
          value={products}
          onChange={this.handleChange}
          isMulti={true}
          options={this.props.products}
          components={Animated()}
          placeholder={"Select products"}
          getOptionValue={(options) => options.id}
          getOptionLabel={(options) => options.name}

        />
        <Table 
          products={this.state.products}
          updateQuantity={this.updateQuantity}
          deleteProduct={this.deleteProduct}
        /> 
        <div className="border-top mt-3 pt-3">
        <p className="font-bold float-right">
            Total: 
            <span className="font-weight-normal">
                $ {this.state.total}
            </span>
        </p>
        <GeneratorOrder 
          products={this.state.products}
          total={this.state.total}
          idClient={this.props.id}
        />

        </div>

      </Fragment>
    );
  }
}

export default OrderContentList;