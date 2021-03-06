import React from 'react';
import { Query } from "react-apollo";
import { TOP_CLIENTS } from "../../services/queries/index.query";
import { Spinner, BarChartComponent} from "../Index.components";




const ClientPanel = () => {
  return (
    <Query query={TOP_CLIENTS}>
      {({ loading, error, data, refetch }) => {
          if (loading) return <Spinner color={"#18BC9C"} />;
          if (error) return `Error: ${error.message}`;
          return (
            <div className="row mt-5 justify-content-center">
              <BarChartComponent data={data.topClients} typechart={"CLIENT"}/>
            </div>
          );
        }}
    </Query>
  );
};

export default ClientPanel;