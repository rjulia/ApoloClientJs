import React, { Component, Fragment } from "react";
import Title from "../components/ui/Title";

export default class NewClient extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        edad: '',
        tipo: ''
            
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
    return (
      <Fragment>
        <Title title="New client" />
        <div className="row justify-content-center">
          <form className="col-md-8 m-3">
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
                  <option value="BASICO">BÁSICO</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-success float-right">
              Guardar Cambios
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}
