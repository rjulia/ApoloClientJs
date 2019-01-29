import React, { Component, Fragment } from "react";
import Title from "../components/title/Title";
import { NEW_CLIENT} from '../services/mutations/index.mutations';
import { Mutation } from "react-apollo";

import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
const SweetAlert = withSwalInstance(swal);

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
        show: false
            
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
          <Mutation mutation={NEW_CLIENT}>
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
                    error: false,
                    show: true
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
                  <label>Nombre</label>
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
                  <label>Apellido</label>
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
                  <label>Empresa</label>
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
                  <label>Edad</label>
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
                  <label>Tipo Cliente</label>
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
                Agregar cliente
              </button>
            </form>
            )}
          </Mutation>
        </div>
        <SweetAlert
          show={this.state.show}
          title="GOOD!"
          text="The client was saved succesfull"
          onConfirm={() => this.setState({ show: false })}
        />
      </Fragment>
    );
  }
}
