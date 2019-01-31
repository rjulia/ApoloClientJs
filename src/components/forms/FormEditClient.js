import React, { Component, Fragment } from "react";
import { UPDATE_CLIENT  } from "../../services/mutations/index.mutations";
import { Mutation  } from "react-apollo";
import { withRouter } from 'react-router-dom'

import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
const SweetAlert = withSwalInstance(swal);
const SweetError = withSwalInstance(swal);

class FormEditClient extends Component {
  state = {
    cliente: this.props.client,
    emails: this.props.client.emails,
    error: false,
    show: false,
    hasError: false,
  };

  nuevoCampo = () => {
    this.setState({
      emails: this.state.emails.concat([{ email: "" }])
    });
  };

  leerCampo = i => e => {
    const nuevoMail = this.state.emails.map((email, index) => {
      if (i !== index) return email;
      return { ...email, email: e.target.value };
    });
    this.setState({ emails: nuevoMail });
  };

  quitarCampo = i => () => {
    this.setState({
      emails: this.state.emails.filter((s, index) => i !== index)
    });
  };

  render() {
    
    const { emails } = this.state;
    const { nombre, apellido, empresa, edad, tipo} = this.state.cliente;
    return (
      <Fragment>
      <Mutation 
        mutation={UPDATE_CLIENT} 
        onCompleted={() => this.setState({
              show: true
            })}
        onError = {()=> this.setState({hasError: true})}>
        {updateClient => (
          <form className="col-md-8 m-3" onSubmit={e => {
            e.preventDefault();
            const {id, nombre, apellido, empresa, edad, tipo} = this.state.cliente;
            const {emails} = this.state;
            const input = {
                id, 
                nombre, 
                apellido, 
                empresa, 
                edad: Number(edad), 
                tipo,
                emails
            }
            console.log(input)

            updateClient({
              variables: {input}
            })

          }}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Nombre</label>
                <input 
                  type="text" 
                  defaultValue={nombre} 
                  className="form-control" 
                  onChange={e => this.setState({ 
                    cliente: {
                        ...this.state.cliente,
                        nombre: e.target.value
                    
                    }})}
                  />
              </div>
              <div className="form-group col-md-6">
                <label>Apellido</label>
                <input 
                  type="text" 
                  defaultValue={apellido} 
                  className="form-control" 
                  onChange={e => this.setState({ 
                    cliente: {
                        ...this.state.cliente,
                        apellido: e.target.value
                    
                    }})} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-12">
                <label>Empresa</label>
                <input 
                  type="text" 
                  defaultValue={empresa} 
                  className="form-control" 
                  onChange={e => this.setState({ 
                    cliente: {
                        ...this.state.cliente,
                        empresa: e.target.value
                    
                    }})} />
              </div>

              {emails.map((input, index) => (
                <div key={index} className="form-group col-md-12">
                  <label>Email {index + 1} : </label>
                  <div className="input-group">
                    <input
                      type="email"
                      placeholder={`Email`}
                      className="form-control"
                      onChange={this.leerCampo(index)}
                      defaultValue={input.email}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={this.quitarCampo(index)}
                      >
                        &times; Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="form-group d-flex justify-content-center col-md-12">
                <button
                  onClick={this.nuevoCampo}
                  type="button"
                  className="btn btn-warning"
                >
                  + Agregar Email
                </button>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Edad</label>
                <input 
                  type="text" 
                  defaultValue={edad} 
                  className="form-control" 
                  onChange={e => this.setState({ 
                    cliente: {
                        ...this.state.cliente,
                        edad: e.target.value
                    
                    }})} />
              </div>
              <div className="form-group col-md-6">
                <label>Tipo Cliente</label>
                <select 
                  value={tipo} 
                  className="form-control" 
                  onChange={e => this.setState({ 
                    cliente: {
                        ...this.state.cliente,
                        tipo: e.target.value
                    
                    }})}>
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
        )}

      </Mutation>
      <SweetAlert
          show={this.state.show}
          title="GOOD!"
          text="The client was saved succesfull"
          onConfirm={
            () => {
              this.setState({ show: false });
              this.props.refetch().then(() =>{
                  this.props.history.push('/')
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
// withRouter is hight component, and now we have push in touter
export default withRouter(FormEditClient);
