import React, { Component, Fragment } from 'react';
import { AUTH_USER } from "../../services/mutations/index.mutations";

import { withRouter } from 'react-router-dom';
import { Title, Input } from "../../components/Index.components";

import { Mutation } from 'react-apollo';
import { withSwalInstance } from "sweetalert2-react";
import swal from "sweetalert2";
const SweetAlert = withSwalInstance(swal);
const SweetError = withSwalInstance(swal);

const initialState = {
    user : '',
    password: ''
}

class Login extends Component {
    state = {
        ...initialState
    }

    handleInputChange = e => {
         const { name, value} = e.target;

        this.setState({
            [name] : value
        })
     }


    cleanState = () => {
         this.setState({...initialState});
    }

    initialSession = (e, authUser) => {
      const { user, password } = this.state;

      e.preventDefault();
      authUser({
        variables: {user, password}
      }).then( async ({data}) => {
       
        localStorage.setItem('tokenGraphl',data.authUser.token)
        //ejecutar el query una vez que se haya iniciado sesion
        await this.props.refetch();
        // limpiar el state

        //rediriguir
      }); 
    }

     validateForm = () => {
        const {user, password} = this.state;
        const noValid = !user || !password;
        return noValid;
     }
    render() { 

        const {user, password} = this.state;
      
        return ( 
            <Fragment>
                <Title title="Init Session" />

                <div className="row  justify-content-center">

                    <Mutation 
                        mutation={ AUTH_USER }
                        variables={{user, password}}
                        onCompleted={(e) =>{
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
                    {( authUser, {loading, error, data}) => {

                        return (
                            
                            <form 
                                onSubmit={ e => this.initialSession(e, authUser) } 
                                className="col-md-8"
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

                            <button 
                                disabled={ 
                                    loading || this.validateForm()
                                }
                                type="submit" 
                                className="btn btn-success float-right">
                                    Sign In
                            </button>
                            
                        </form>
                        )     
                    }}
                    </Mutation>
                </div>
                <SweetAlert
                  show={this.state.show}
                  title="GOOD!"
                  text="Wellcome Again"
                  onConfirm={() => {
                    this.setState({ show: false });
                    this.cleanState()
                    this.props.history.push("/panel");
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
 
export default withRouter(Login);