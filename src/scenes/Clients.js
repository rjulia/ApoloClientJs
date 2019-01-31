import React, { Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";

//queries
import { CLIENTS_QUERY } from "../services/queries/index.query";
import { DELETE_CLIENT } from "../services/mutations/index.mutations";

import Title from "../components/title/Title";

import { withSwalInstance } from "sweetalert2-react";
import swal from "sweetalert2";
const SweetAlert = withSwalInstance(swal);

const Loading = <h1>Cargando</h1>;

class Clients extends React.Component {
  state = {
    show: false,
  };

  render() {
    return (
      <Query query={CLIENTS_QUERY} pollInterval={2000}>
        {({ loading, error, data, starPolling, stopPolling }) => {
          if (loading) return Loading;
          if (error) return `Error: ${error.message}`;
          const list = data.getClients;
          return (
            <Fragment>
              <Title title="Listado De clientes" />
              <ul className="list-group mt-4">
                {list.map(client => {
                  const { id } = client;
                  return (
                    <li className="list-group-item" key={client.id}>
                      <div className="row justify-content-between align-items-center">
                        <div className="col-md-8 d-flex justify-content-between">
                          {client.nombre} {client.apellido} - {client.empresa}
                        </div>
                        <div className="col-md-4 d-flex justify-content-end ">
                          <Mutation mutation={DELETE_CLIENT}>
                            {deleteCLient => (
                              <button
                                type="button"
                                onClick={() => {

                                  swal.fire({
                                    title: 'Are you sure?',
                                    text: "You won't be able to revert this!",
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Yes, delete it!'
                                  }).then((result) => {
                                    if (result.value) {
                                      deleteCLient({ variables: { id }});
                                      swal.fire(
                                        'Deleted!',
                                        'Your file has been deleted.',
                                        'success'
                                      )
                                    }
                                  })
                                  
                                }}
                                className="btn btn-danger mr-2"
                              >
                                Delete
                              </button>
                            )}
                          </Mutation>
                          <Link
                            className="btn btn-success d-block d-md-inline-block"
                            to={`/client/edit/${client.id}`}
                            params={client.id}
                          >
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
  }
}

export default Clients;
