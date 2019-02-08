import React, { Component, Fragment } from "react";
import { Title, Spinner, Pagination } from "../../components/Index.components";

import { Query, Mutation } from "react-apollo";
import { PRODUCTS_QUERY } from "../../services/queries/index.query";
import { DELETE_PRODUCT } from "../../services/mutations/index.mutations";

 
import { Link } from "react-router-dom";
import swal from "sweetalert2";

class Products extends Component {

  limit = 5;
  state = {
    show: false,
    message: '',
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
  deleteProduct = (id) => {
    return(
    <Mutation 
        mutation={DELETE_PRODUCT}
        onCompleted ={(data) => {
          this.setState({
            message: data.deleteProduct
        })}}>
        {deleteProduct => (
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
                  deleteProduct({ variables: { id }});
                  swal.fire(
                    'Deleted!',
                    this.state.message,
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
    )}

  render() {
    return (
      <Query
        query={PRODUCTS_QUERY}
        pollInterval={2000}
        variables={{ limit: this.limit, offset: this.state.pager.offset }}
      >
        {({ loading, error, data, starPolling, stopPolling }) => {
          if (loading) return <Spinner color={"#18BC9C"} />;
          if (error) return `Error: ${error.message}`;
          const list = data.getProducts;
          const headTables = [
            'id',
            'name',
            'price',
            'stock',
            'Delete',
            'Edit']
          return (
            <Fragment>
              <Title title="Products List" />

              <table className="table table-striped">
                <thead>
                  <tr className="table-primary">
                  {headTables.map( (key, index) => (
                    <th key={index} scope="col">{key}</th>
                  ))}
                  </tr>
                </thead>
                <tbody>
                {list.map((product, index) => {
                  const { id } = product;
                  const { stock }= product;

                  let classColorStock = (stock < 100) ? 'table-danger text-light' : 'font-weight-bold';
                  return (
                  <tr key={id}>
                    <th scope="row">{index + 1}</th>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td className={classColorStock}>{product.stock}</td>
                    <td>
                      {this.deleteProduct(id)}
                    </td>
                    <td>
                      <Link
                        className="btn btn-success d-block d-md-inline-block"
                        to={`/product/edit/${product.id}`}
                        params={product.id}
                      >
                        Edit product
                      </Link>
                    </td>
                  </tr>
                  );
                })}
                </tbody>
              </table>
              <Pagination
                  current={this.state.pager.current}
                  totalItems={data.totalProducts}
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

export default Products;
