import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
//queries
import { CLIENTS_QUERY } from "../services/queries/index.query";
import Title from "../components/title/Title";

const Loading = <h1>Cargando</h1>;

const Clients = () => (
  <Query query={CLIENTS_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return Loading;
      if (error) return `Error: ${error.message}`;
      console.log(data);
      const list = data.getClients;
      return (
        <Fragment>
          <Title title="Listado De clientes"/>
          <ul className="list-group mt-4">
            {list.map(client => {
              return (
                <li className="list-group-item" key={client.id}>
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-8 d-flex justify-content-between">
                      {client.nombre} {client.apellido} - {client.empresa}
                    </div>
                    <div className="col-md-4 d-flex justify-content-end ">
                      <Link className="btn btn-success d-block d-md-inline-block" to={`/client/edit/${client.id}`} params={client.id}>
                        Editar Cliente
                      </Link>                     
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Fragment>
      );
    }}
  </Query>
);

export default Clients;
