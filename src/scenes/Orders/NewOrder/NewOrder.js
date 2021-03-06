import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { Title, ClientWidget, Spinner } from "../../../components/Index.components";
import { OrderContent } from "../../index.scenes";


import { PRODUCTS_QUERY} from "../../../services/queries/index.query";

class NewOrder extends Component {

  render() {

    //obtener el Id del vendedor actual

    const idSeller = this.props.session.getUser.id
    const {id} = this.props.match.params;

    return (
      <Fragment>
        <Title title="New Order" />
          <div className=" row justify-content-center">
            <div className="col-md-3">
              <ClientWidget id={id}/>
            </div>
            <div className="col-md-9">
              <Query query={PRODUCTS_QUERY}
                variables={{hasStock: true}}>
                {({ loading, error, data, refetch }) => {
                  if (loading) return <Spinner color={"#18BC9C"} />;
                  if (error) return `Error: ${error.message}`;
                  return <OrderContent products={data.getProducts} id={id} idSeller={idSeller}/>
                }}

              </Query>
            </div>
          </div>
      </Fragment>
    );
  }
}

export default withRouter(NewOrder);