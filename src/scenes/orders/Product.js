import React, { Component } from 'react';

class Product extends Component {

  render() {
    const idx = this.props.index
    const { id, name, price, stock } = this.props.product;
    return (
      <tr key={id}>
        <th scope="row">{idx + 1}</th>
        <td>{name}</td>
        <td>${price}</td>
        <td>{stock}</td>
        <td>{stock}</td>
        <td>{stock}</td>
      </tr>
    );
  }
}

export default Product;