import React, { Component, Fragment } from 'react';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
const SweetAlert = withSwalInstance(swal);

class RowProduct extends Component {

  state = {
    quantity: 0,
    show: false,
    message: ''
  }
  render() {
    const idx = this.props.index
    const { id, name, price, stock } = this.props.product;
    return (
      <Fragment>
      <tr key={id}>
        <th scope="row">{idx + 1}</th>
        <td>{name}</td>
        <td>${price}</td>
        <td>{stock}</td>
        <td>
          <input 
            min="1"
            type="number" 
            className="form-control"
            valuedefault="0"
            onChange={e => {
              if(e.target.value > stock) {
                  e.target.value = 0;
                  this.setState(
                    { 
                      show: true,
                      message: `You only can select ${stock} products`
                    }
                  )
              }
              if(e.target.value < 0) {
                  e.target.value = 0;
                  this.setState(
                    { 
                      show: true,
                      message: `You only can select possitve numbers`
                    }
                  )
              }
              this.props.updateQuantity(e.target.value, this.props.index)}
            }      
          />
        </td>
        <td>
          <button 
            type="button" 
            className="btn btn-danger"
            onClick={e => this.props.deleteProduct(id)}>Delete</button>
        </td>
      </tr>
       <SweetAlert
          show={this.state.show}
          title="SORRY!"
          text={this.state.message} 
          onConfirm={
            () => {
              this.setState(
                { 
                  show: false ,
                  message: ''
                }
              )
            }
          }
        />
      </Fragment>
    );
  }
}

export default RowProduct;