import React, { Component, Fragment } from "react";
import Title from "../components/title/Title";
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
        hasError: false
            
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
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
                <div className="form-group col-md-6">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="nombre"
                    value={this.state.nombre}
                    onChange={this.handleInputChange}
                    className="form-control"
                    placeholder="Nombre"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Surname</label>
                  <input
                    type="text"
                    name="apellido"
                    value={this.state.apellido}
                    onChange={this.handleInputChange}
                    className="form-control"
                    placeholder="Apellido"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Company</label>
                  <input
                    type="text"
                    name="empresa"
                    value={this.state.empresa}
                    onChange={this.handleInputChange}
                    className="form-control"
                    placeholder="Empresa"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Years</label>
                  <input
                    type="text"
                    name="edad"
                    value={this.state.edad}
                    onChange={this.handleInputChange}
                    className="form-control"
                    placeholder="Edad"
                  />
                </div>
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
