import React , {Fragment}from 'react';
import { Query } from "react-apollo";
import { ORDERS_QUERY} from "../../../services/queries/index.query";
import { CardOrder } from "../../index.scenes";

import { Title, Spinner } from "../../../components/Index.components";

const ListOrders = (props) => {

  const name = props.location.hash.substr(1).replace('%20', ' ')
  const clientId = props.match.params.id

  return (
    <Fragment>
      <Title title={`Order by Client ${name}` }/>
      <div className="row">
        <Query query={ORDERS_QUERY}
          variables={{client: clientId}}
          pollInterval={500}>
          {({ loading, error, data, refetch, startPolling, stopPolling }) => {
            if (loading) return <Spinner color={"#18BC9C"} />;
            if (error) return `Error: ${error.message}`;
            return (
                data.getOrders.map(order => (
                  <CardOrder 
                    key={order.id}
                    clientId={clientId}
                    order={order}/>
                ))
            )
          }}

        </Query>
      </div>
    </Fragment>
  );
};

export default ListOrders;