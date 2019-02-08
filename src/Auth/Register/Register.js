import React, { Component, Fragment } from "react";
import { Title, Input } from "../../components/Index.components";
import { CREATE_USER} from "../../services/mutations/index.mutations";
import { Mutation } from "react-apollo";

import { withSwalInstance } from "sweetalert2-react";
import swal from "sweetalert2";
const SweetAlert = withSwalInstance(swal);
const SweetError = withSwalInstance(swal);
const initialState = {
  user: "",
  password: "",
  repeatPassword: "",
  show: false,
  hasError: false
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
    console.log(this.validateEmail());

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

  render() {
    return (
      <Fragment>
        <Title title="new user" />
        <div className="row justify-content-center">
          <Mutation
            mutation={CREATE_USER}
            onCompleted={() =>
              this.setState({
                show: true
              })
            }
            onError={() => this.setState({ hasError: true })}
          >
            {createUser => (
              <form
                className="col-md-8"
                onSubmit={event => {
                  event.preventDefault();
                  const { user, password } = this.state;
                  createUser({
                    variables: { user, password}
                  });
                }}
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

export default Register;
