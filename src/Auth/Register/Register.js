import React, { Component, Fragment } from "react";
import { Title, Input } from "../../components/Index.components";
import { CREATE_USER } from "../../services/mutations/index.mutations";
import { Mutation } from "react-apollo";
import { withRouter } from 'react-router-dom';

import { withSwalInstance } from "sweetalert2-react";
import swal from "sweetalert2";
const SweetAlert = withSwalInstance(swal);
const SweetError = withSwalInstance(swal);
const initialState = {
  user: "",
  password: "",
  repeatPassword: "",
  show: false,
  hasError: false,
  message: ''
};

class Register extends Component {
  state = {
    ...initialState
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  validadFrom = () => {
    const { user, password, repeatPassword } = this.state;
    const noValid = !user || !this.validateEmail() || !password || password !== repeatPassword;

    return noValid;
  };

  validateEmail = () => {
    const { user } = this.state;
    const emailValid = user.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if(emailValid) {
      return (true)
    }
    return (false)
    
  } 
  createNewUser = (e, createUser, error) => {
    const { user, password } = this.state;
    e.preventDefault();
    createUser({
      variables: {user, password}
    }).then(
      data => console.log('desde then', data)
    );
  }

  cleanState = () => {
    this.setState({
      ...initialState
    })
  }
  render() {
    
    return (
      <Fragment>
        <Title title="new user" />
        <div className="row justify-content-center">
          <Mutation
            mutation={CREATE_USER}
            onCompleted={(e) =>{
              console.log('on complete', e)
              this.setState({
                show: true
              })
            }}
            onError={(e) => {
              this.setState({ 
                hasError: true,
                message: e.message       
              })
            }}
          >
            {(createUser, {loading, error, data}) => (
              <form
                className="col-md-8"
                onSubmit={e => this.createNewUser(e, createUser, error)} 
              >

                <Input
                  inputtype={"email"}
                  title={"User eamil"}
                  name={"user"}
                  param={"form-group"}
                  value={this.state.user}
                  placeholder={"Email"}
                  onChange={this.handleInputChange}
                />{" "}
                <Input
                  inputtype={"text"}
                  title={"Password"}
                  name={"password"}
                  param={"form-group"}
                  value={this.state.password}
                  placeholder={"Password"}
                  onChange={this.handleInputChange}
                />{" "}
                <Input
                  inputtype={"text"}
                  title={"Repeat password"}
                  name={"repeatPassword"}
                  param={"form-group"}
                  value={this.state.repeatPassword}
                  placeholder={"Password"}
                  onChange={this.handleInputChange}
                />{" "}
                <button
                  disabled={this.validadFrom()}
                  type="submit"
                  className="btn btn-success float-right"
                >
                  Crear Usuario
                </button>
              </form>
            )}
          </Mutation>
        </div>
        <SweetAlert
          show={this.state.show}
          title="GOOD!"
          text="The User was saved succesfull"
          onConfirm={() => {
            this.setState({ show: false });
            this.props.history.push("/login");
          }}
        />
        <SweetError
          show={this.state.hasError}
          title="HEY!"
          type="warning"
          text={this.state.message}
          onConfirm={() => this.setState({ 
              hasError: false,
              message: ''
          })}
        />
      </Fragment>
    );
  }
}

export default withRouter(Register);
