import React, { Component, Fragment } from "react";
import { UPDATE_PRODUCT  } from "../../services/mutations/index.mutations";
import { Mutation  } from "react-apollo";
import { Input, Button } from "../../components/Index.components";
import { withRouter } from 'react-router-dom';

import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
const SweetAlert = withSwalInstance(swal);
const SweetError = withSwalInstance(swal);

class FormEditProduct extends Component {
  constructor(props) {
    super(props)
    const { id, name, stock, price } = this.props.product;
    this.state = {
        id: id,
        name: name,
        price: price,
        stock: stock,
        show: false,
        hasError: false,
        noValid: true
            
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  validFrom = () => {
      const {name, price, stock} = this.state;
      const noValid = !name || !price || !stock;
      return noValid;
  }

   handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState(
      prevState => ({    
        ...prevState,
        [name]: value      
      }),
    );
   
  }

  render() {

    return (
       <Fragment>
        <Mutation mutation={UPDATE_PRODUCT} 
          onCompleted={() => this.setState({
              show: true
            })}
          onError = {()=> this.setState({hasError: true})}>
          {updateProduct => (
            <form className="col-md-8 m-3" onSubmit={e => {
              e.preventDefault();
              const {id, name, stock, price} = this.state;
              const input = {
                  id, 
                  name, 
                  price: Number(price), 
                  stock: Number(stock), 
              }
              updateProduct({
                variables: {input}
              })

            }}>
              <Input
                  inputtype={"text"}
                  title={"Product name"}
                  name={"name"}
                  param={"form-group"}
                  value={this.state.name}
                  placeholder={"Product Name"}
                  onChange={this.handleInputChange}
              />{" "}
               <Input
                  inputtype={"number"}
                  title={"Product price"}
                  name={"price"}
                  param={"form-group"}
                  defaultValue={this.state.price}
                  placeholder={"Product price"}
                  onChange={this.handleInputChange}
              />{" "}
              <Input
                  inputtype={"number"}
                  title={"Product stock"}
                  name={"stock"}
                  param={"form-group"}
                  defaultValue={this.state.stock}
                  placeholder={"Product Stock"}
                  onChange={this.handleInputChange}
              />{" "}
              <Button
                  type={"submit"}
                  disabled={this.validFrom()}
                  name={"Save New Product"}
                  classButton={"btn btn-success float-right"}
              />
          </form>
        )}
        </Mutation>
        <SweetAlert
          show={this.state.show}
          title="GOOD!"
          text="The product was saved succesfull"
          onConfirm={
            () => {
              this.setState({ show: false });
              this.props.refetch().then(() =>{
                  this.props.history.push('/products')
              })
            }
          }
        />
        <SweetError
          show={this.state.hasError}
          title="HEY!"
          type= 'warning'
          text="Something happend in Data Base"
          onConfirm={() => this.setState({ hasError: false })}
        />
      </Fragment>
    );
  }
}
//pasas propr.history por aqui withRouter
export default withRouter(FormEditProduct);