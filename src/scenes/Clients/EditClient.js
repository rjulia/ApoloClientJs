import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import { Title, Spinner, FormEditClient } from "../../components/Index.components";

import { CLIENT_QUERY } from "../../services/queries/index.query";

export default class EditClient extends Component {
  render() {
    const { id } = this.props.match.params;

    return (
      <Fragment>
        <Title title="Edit client" />
        <div className=" row justify-content-center">
          <Query query={CLIENT_QUERY} variables={{ id }}>
            {({ loading, error, data, refetch }) => {
              if (loading) return <Spinner color={"#18BC9C"} />;
              if (error) return `Error: ${error.message}`;
              return <FormEditClient refetch={refetch} client={data.getClient}/>;
            }}
          </Query>
        </div>
      </Fragment>
    );
  }
}
