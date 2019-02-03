import React, { Component, Fragment } from 'react';
import { Query } from "react-apollo";

import {Title, FormEditProduct, Spinner } from "../../components/Index.components";

import { PRODUCT_QUERY } from "../../services/queries/index.query";
class EditProduct extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <Fragment>
        <Title title="Edit Product" />
        <div className="row justify-content-center">
          <Query query={PRODUCT_QUERY} variables={{ id }}>
            {({ loading, error, data, refetch }) => {
              console.log(data)
              if (loading) return <Spinner color={"#18BC9C"} />;
              if (error) return `Error: ${error.message}`;
              return <FormEditProduct id={id} refetch={refetch} product={data.getProduct}/>; 
            }}
          </Query>
        </div>
      </Fragment>

    );
  }
}

export default EditProduct;