import React, { Fragment } from "react";
import { Query } from "react-apollo";

import { Title, Spinner } from "../Index.components";
import { CLIENT_QUERY } from "../../services/queries/index.query";
import working from "../../images/working.jpeg";

const ClientWidget = ({ id }) => {
  return (
    <Fragment>
      <Title heading={4} title="Data Client" />
      <Query query={CLIENT_QUERY} variables={{ id }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Spinner color={"#18BC9C"} />;
          if (error) return `Error: ${error.message}`;
          const { apellido, nombre, tipo, empresa, emails } = data.getClient;
          return (
            <div className="card">
              <img src={working} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">
                  Sr/Sra.: {`${nombre} ${apellido}`}
                </h5>
                <p className="card-text">Empresa: {empresa}</p>
                <span className="badge badge-pill badge-info">{tipo}</span>
                <p className="card-text mt-2">Emails:</p>
                <ul className="list-group list-group-flush">
                  {emails.map((email, idx) => (
                    <li key={idx} className="list-group-item">{email.email}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }}
      </Query>
    </Fragment>
  );
};

export default ClientWidget;
