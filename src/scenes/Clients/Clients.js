import React, { Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";

//queries
import { CLIENTS_QUERY } from "../../services/queries/index.query";
import { DELETE_CLIENT } from "../../services/mutations/index.mutations";

import {Title, Pagination, Spinner, Select } from "../../components/Index.components";

import swal from "sweetalert2";



class Clients extends React.Component {

  limit = 5;
  state = {
    show: false,
    filter: '',
    value: '',
    pager: {
      current: 1,
      offset: 0 
    }
  };
  prevPage = () => {
    this.setState({
        pager: {
          offset: this.state.pager.offset - this.limit,
          current: this.state.pager.current - 1
        }
    })
  }

  nextPage = () => {
    this.setState({
        pager: {
          offset: this.state.pager.offset + this.limit,
          current: this.state.pager.current + 1
        }
    })
  }
  
  componentDidUpdate(){
    if(this.props){
      const { rol } = this.props.session.getUser
      let id
      if (rol === "SELLER") {
  
        id = this.props.session.getUser.id;
        
      } else {
        id = ''
      }
      this.setState({
        filter: id,
        value: id
      })
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  render() {
    
    
    const options = [
      {
        value: '',
        name: 'Choose'
      },
      {
        value: '',
        name: 'All'
      },
      {
        value: this.state.value,
        name: 'Seller'
      }
    ]
    return (
      <Query 
        query={CLIENTS_QUERY} 
        pollInterval={2000} 
        variables={{
          limit: this.limit, 
          offset: this.state.pager.offset, 
          seller: this.state.filter
        }}>
        {({ loading, error, data, starPolling, stopPolling }) => {
          if (loading) return <Spinner color={"#18BC9C"} />;
          if (error) return `Error: ${error.message}`;
          const list = data.getClients;
          return (
            <Fragment>
              <Title title="Client List" />
              <Select
                title={"Filter clients"}
                name={"filter"}
                param={"form-group"}
                value={this.state.filter}
                options={options}
                onChange={this.handleInputChange}
              />{" "}
              <ul className="list-group mt-4">
                {list.map(client => {
                  const { id , name, surname} = client;
                  const namecomplete = `${name} ${surname}`
                  return (
                    <li className="list-group-item" key={client.id}>
                      <div className="row justify-content-between align-items-center">
                        <div className="col-md-6 d-flex justify-content-between">
                          {name} {surname} - {client.company}
                        </div>
                        <div className="col-md-6 d-flex justify-content-end ">
                         <Link
                            className="btn btn-warning d-block d-md-inline-block mr-2"
                            to={`/order/new/${id}`}
                            params={id}
                          >
                            New Order
                          </Link>
                          <Link
                            className="btn btn-primary d-block d-md-inline-block mr-2"
                            to={{pathname:`/orders/${id}`, hash: `${namecomplete}` }}
                            params={id}
                            key={namecomplete}
                          >
                            View Orders
                          </Link>
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
                            Edit Client
                          </Link>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
               <Pagination
                  current={this.state.pager.current}
                  totalItems={data.totalClients}
                  limit={this.limit}
                  prevPage={this.prevPage}
                  nextPage={this.nextPage}
               />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default Clients;
