import React, { Component, Fragment } from "react";
import { Title, Input, Button } from "../../components/Index.components";
import { NEW_PRODUCT } from "../../services/mutations/index.mutations";
import { Mutation } from "react-apollo";

import { withSwalInstance } from "sweetalert2-react";
import swal from "sweetalert2";
const SweetAlert = withSwalInstance(swal);
const SweetError = withSwalInstance(swal);

class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      stock: 0, 
      noValid: true
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // this.setState({
    //   [name]: value
    // });
    this.setState(
      prevState => ({
        ...prevState,
        [name]: value
      }),
      () => console.log(this.state)
    );
  }
  validFrom = () => {
      const {name, price, stock} = this.state;
      const noValid = !name || !price || !stock;
      return noValid;
  }

  render() {

    const {error} = this.state
    let respuesta = (error) ? <p className="alert alert-danger p3 text-center"> all fields are required</p> : ''

    return (
      <Fragment>
        <Title title="New Product" />
         {respuesta}
        <div className="row justify-content-center">
          <Mutation
            mutation={NEW_PRODUCT}
            onCompleted={() =>
              this.setState({
                show: true
              })
            }
            onError={() => this.setState({ hasError: true })}
          >
            {setProduct => (
              <form className="col-md-8"
                onSubmit={event =>{
                event.preventDefault();
                 const {name, price, stock} = this.state;
                this.setState({
                    error: false
                })
                const input = {
                  name,
                  price : Number(price),
                  stock: Number(stock),
                };
                console.log(input)
                setProduct({
                    variables: {input}
                })
              }}>
                <Input
                  inputtype={"text"}
                  title={"Product Name"}
                  name={"name"}
                  param={"form-group col-md-12"}
                  value={this.state.name}
                  placeholder={"Product Name"}
                  onChange={this.handleInputChange}
                />{" "}
                <Input
                  inputtype={"number"}
                  title={"Product Price"}
                  name={"price"}
                  param={"form-group col-md-12"}
                  value={this.state.price}
                  placeholder={"Price"}
                  onChange={this.handleInputChange}
                />{" "}
                <Input
                  inputtype={"number"}
                  title={"Sock this product"}
                  name={"stock"}
                  param={"form-group col-md-12"}
                  value={this.state.stock}
                  placeholder={"Stock"}
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
        </div>

        <SweetAlert
          show={this.state.show}
          title="GOOD!"
          text="The product was saved succesfull"
          onConfirm={() => {
            this.setState({ show: false });
            this.props.history.push("/");
          }}
        />
        <SweetError
          show={this.state.hasError}
          title="HEY!"
          type="warning"
          text="Something happend in Data Base"
          onConfirm={() => this.setState({ hasError: false })}
        />
      </Fragment>
    );
  }
}

export default NewProduct;
