import React, { Component } from 'react';


class Product extends Component {

  state = {
    quantity: 0
  }
  render() {
    const idx = this.props.index
    const { id, name, price, stock } = this.props.product;
    return (
      <tr key={id}>
        <th scope="row">{idx + 1}</th>
        <td>{name}</td>
        <td>${price}</td>
        <td>{stock}</td>
        <td>
          <input 
            type="number" 
            className="form-control"
            valuedefault="0"
            onChange={e => this.props.updateQuantity(e.target.value, this.props.index)}
          />
        </td>
        <td>
          <button 
            type="button" 
            className="btn btn-danger"
            onClick={e => this.props.deleteProduct(id)}>Delete</button>
        </td>
      </tr>
    );
  }
}

export default Product;