import React, { Component, Fragment } from "react";
import { UPDATE_CLIENT  } from "../../services/mutations/index.mutations";
import { Mutation  } from "react-apollo";
import { withRouter } from 'react-router-dom';

import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
const SweetAlert = withSwalInstance(swal);
const SweetError = withSwalInstance(swal);

class FormEditClient extends Component {
  state = {
    client: this.props.client,
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
    const { name, surname, company, years, type} = this.state.client;
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
            const {id, name, surname, company, years, type} = this.state.client;
            const {emails} = this.state;
            const input = {
                id, 
                name, 
                surname, 
                company, 
                years: Number(years), 
                type,
                emails
            }

            updateClient({
              variables: {input}
            })

          }}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>name</label>
                <input 
                  type="text" 
                  defaultValue={name} 
                  className="form-control" 
                  onChange={e => this.setState({ 
                    client: {
                        ...this.state.client,
                        name: e.target.value
                    
                    }})}
                  />
              </div>
              <div className="form-group col-md-6">
                <label>surname</label>
                <input 
                  type="text" 
                  defaultValue={surname} 
                  className="form-control" 
                  onChange={e => this.setState({ 
                    client: {
                        ...this.state.client,
                        surname: e.target.value
                    
                    }})} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-12">
                <label>company</label>
                <input 
                  type="text" 
                  defaultValue={company} 
                  className="form-control" 
                  onChange={e => this.setState({ 
                    client: {
                        ...this.state.client,
                        company: e.target.value
                    
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
                        &times; Delete
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
                  + Add Email
                </button>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>years</label>
                <input 
                  type="text" 
                  defaultValue={years} 
                  className="form-control" 
                  onChange={e => this.setState({ 
                    cliente: {
                        ...this.state.cliente,
                        years: e.target.value
                    
                    }})} />
              </div>
              <div className="form-group col-md-6">
                <label>type Cliente</label>
                <select 
                  value={type} 
                  className="form-control" 
                  onChange={e => this.setState({ 
                    cliente: {
                        ...this.state.cliente,
                        type: e.target.value
                    
                    }})}>
                  <option value="">Choose...</option>
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
// withRouter is hight component, and now we have push in router
export default withRouter(FormEditClient);
