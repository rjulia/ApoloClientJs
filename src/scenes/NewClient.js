import React, { Component, Fragment } from "react";
import {Title, Input} from "../components/Index.components";
import { NEW_CLIENT} from '../services/mutations/index.mutations';
import { Mutation } from "react-apollo";

import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
const SweetAlert = withSwalInstance(swal);
const SweetError = withSwalInstance(swal);

export default class NewClient extends Component {
  constructor(props) {
    super(props)
    this.state = {
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        edad: '',
        tipo: '',
        error: false,
        show: false,
        hasError: false,
        emails: []
            
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
        ...prevState.newUser,
        [name]: value      
      }),
      () => console.log(this.state.newUser)
    );
  }
  newFiled = () => {
    this.setState({
      emails: this.state.emails.concat([{email:''}])
    })
  }
  deleteFieldEmail = i => () =>{
    this.setState({
      emails: this.state.emails.filter((eamil, index)=> i !== index)
    })
  }

  readEmail = i => e => {
    const newEmail = this.state.emails.map ((email, index)=>{
        if(i !== index) return email;
        return {
          ...email,
          email: e.target.value
        }
    })
    this.setState({
      emails: newEmail
    })
    console.log(this.state.emails)
  }

  render() {
    const {error} = this.state
    let respuesta = (error) ? <p className="alert alert-danger p3 text-center"> all fields are required</p> : ''

    return (
      <Fragment>
        <Title title="New client" />
        {respuesta}
        <div className="row justify-content-center">
          <Mutation 
            mutation={NEW_CLIENT}
            onCompleted={() => this.setState({
              show: true
            })}
            onError = {()=> this.setState({hasError: true})}>
            {setClient => (
               
            <form 
              className="col-md-8 m-3"
              onSubmit={event =>{
                event.preventDefault();
                const {nombre, apellido, empresa, email, edad, tipo} = this.state;
                if(nombre === '' || apellido === '' || email === '' || tipo === '' || empresa === '' || edad === ''){
                  this.setState({
                    error: true
                  })
                  return
                }
                this.setState({
                    error: false
                })
                const input = {
                  nombre,
                  apellido,
                  empresa,
                  email,
                  tipo,
                  edad: Number(edad)
                };
                console.log(input)
                setClient({
                    variables: {input}
                })
              }}>
              <div className="form-row">
                <Input
                    inputtype={"text"}
                    title={"First Name"}
                    name={"nombre"}
                    param={"form-group col-md-6"}
                    value={this.state.nombre}
                    placeholder={"Name"}
                    onChange={this.handleInputChange}
                />{" "}
                <Input
                    inputtype={"text"}
                    title={"Surname"}
                    name={"apellido"}
                    param={"form-group col-md-6"}
                    value={this.state.apellido}
                    placeholder={"Surname"}
                    onChange={this.handleInputChange}
                />{" "}
              </div>
              <div className="form-row">
                <Input
                    inputtype={"text"}
                    title={"Company"}
                    name={"empresa"}
                    param={"form-group col-md-12"}
                    value={this.state.empresa}
                    placeholder={"Company"}
                    onChange={this.handleInputChange}
                />{" "}
                
                {this.state.emails.map((input, index) =>(
                  <div key={index} className="form-group col-md-12">
                    <label>Email: {index + 1}</label>
                    <div className="input-group">
                      <input
                        type="email"
                        name="email"
                        // value={this.state.email}
                        onChange={this.readEmail(index)}
                        className="form-control"
                        placeholder="Email"
                      />
                      <div className="input-group-append"> 
                        <button 
                        onClick={this.deleteFieldEmail(index)}
                        type="button"
                        className="btn btn-danger"> Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="form-group d-flex justify-content-center col-md-12">
                  <button onClick={this.newFiled}type="button" className="btn btn-warning">Add Email</button>
                </div>
              </div>
              <div className="form-row">
                <Input
                    inputtype={"text"}
                    title={"Years"}
                    name={"edad"}
                    param={"form-group col-md-6"}
                    value={this.state.edad}
                    placeholder={"Years"}
                    onChange={this.handleInputChange}
                />{" "}

                <div className="form-group col-md-6">
                  <label>type of Client</label>
                  <select 
                    name="tipo" 
                    className="form-control"
                    value={this.state.tipo}
                    onChange={this.handleInputChange}>
                    <option value="">Elegir...</option>
                    <option value="PREMIUM">PREMIUM</option>
                    <option value="BASIC">BÁSICO</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-success float-right">
                  ADD CLIENT
              </button>
            </form>
            )}
          </Mutation>
        </div>
        <SweetAlert
          show={this.state.show}
          title="GOOD!"
          text="The client was saved succesfull"
          onConfirm={
            () => {
              this.setState({ show: false })
              this.props.history.push('/')
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
